import express from "express";
import EmergencyAlert from "./models/EmergencyAlert.js";
import Volunteer from "./models/volunteer.js";

// Email transporter and Twilio client (will be passed from server.js)
let transporter;
let twilioClient;

// Set transporter function to be called from server.js
export const setTransporter = (emailTransporter) => {
  transporter = emailTransporter;
};

// Set Twilio client function to be called from server.js
export const setTwilioClient = (client) => {
  twilioClient = client;
};

const router = express.Router();

// Note: Location-based assignment removed - all assignments are now manual

// Send notifications to volunteer and admin
const sendNotifications = async (emergencyAlert, volunteer, adminEmail) => {
  try {
    // Send SMS to emergency contact number
    if (twilioClient) {
      try {
        const emergencySmsMessage = `🚨 EMERGENCY ALERT! 🚨
Name: ${emergencyAlert.victimName}
Phone: ${emergencyAlert.victimPhone}
Location: ${emergencyAlert.location.address}
Type: ${emergencyAlert.emergencyType}
Description: ${emergencyAlert.description}

${volunteer ? `Volunteer ${volunteer.name} (${volunteer.phone}) has been assigned.` : 'Awaiting volunteer assignment.'}

- Emergency Alert System`;

        await twilioClient.messages.create({
          from: "+17753638196",
          to: "+917339486437", // Emergency contact number
          body: emergencySmsMessage,
        });
        console.log(`✅ Emergency SMS sent to emergency contact`);
      } catch (smsError) {
        console.error("❌ Failed to send emergency SMS:", smsError.message);
      }
    }

    // Email notification to volunteer (only if volunteer exists)
    if (volunteer) {
      const volunteerMailOptions = {
        from: process.env.EMAIL_USER,
        to: volunteer.email,
        subject: `🚨 Emergency Alert Assignment - ${emergencyAlert.emergencyType.toUpperCase()}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">🚨 Emergency Alert</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">You have been assigned to an emergency</p>
            </div>

            <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">Assignment Details</h2>

              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
                <h3 style="color: #dc2626; margin: 0 0 15px 0;">📋 Emergency Information</h3>
                <p><strong>Victim:</strong> ${emergencyAlert.victimName}</p>
                <p><strong>Phone:</strong> ${emergencyAlert.victimPhone}</p>
                <p><strong>Email:</strong> ${emergencyAlert.victimEmail}</p>
                <p><strong>Type:</strong> ${emergencyAlert.emergencyType}</p>
                <p><strong>Description:</strong> ${emergencyAlert.description}</p>
                <p><strong>Location:</strong> ${emergencyAlert.location.address}</p>
                <p><strong>Coordinates:</strong> ${emergencyAlert.location.lat}, ${emergencyAlert.location.lng}</p>
              </div>

              <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #0369a1; margin: 0 0 10px 0;">⚡ Action Required</h3>
                <p style="margin: 0;"><strong>Contact the victim immediately:</strong></p>
                <p style="margin: 5px 0 0 0;">📞 Phone: ${emergencyAlert.victimPhone}</p>
                <p style="margin: 5px 0 0 0;">📧 Email: ${emergencyAlert.victimEmail}</p>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${emergencyAlert.victimEmail}?subject=Emergency Response - ${emergencyAlert.emergencyType}" style="background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  📧 Contact Victim
                </a>
              </div>
            </div>

            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
              <p>⏰ Assigned at: ${new Date(emergencyAlert.assignedAt).toLocaleString()}</p>
              <p>📍 Estimated response time: ${emergencyAlert.estimatedResponseTime} minutes</p>
            </div>
          </div>
        `,
      };

      // Send volunteer email
      await transporter.sendMail(volunteerMailOptions);
    }

    // Email notification to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `🚨 Emergency Alert Notification - ${emergencyAlert.emergencyType.toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🚨 Emergency Alert</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">A new emergency alert has been received</p>
          </div>

          <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Emergency Details</h2>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="color: #dc2626; margin: 0 0 15px 0;">📋 Alert Information</h3>
              <p><strong>Victim:</strong> ${emergencyAlert.victimName}</p>
              <p><strong>Phone:</strong> ${emergencyAlert.victimPhone}</p>
              <p><strong>Type:</strong> ${emergencyAlert.emergencyType}</p>
              <p><strong>Description:</strong> ${emergencyAlert.description}</p>
              <p><strong>Location:</strong> ${emergencyAlert.location.address}</p>
              <p><strong>Priority:</strong> ${emergencyAlert.priority}</p>
            </div>

            ${volunteer ? `
              <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                <h3 style="color: #047857; margin: 0 0 15px 0;">✅ Volunteer Assigned</h3>
                <p><strong>Name:</strong> ${volunteer.name}</p>
                <p><strong>Phone:</strong> ${volunteer.phone}</p>
                <p><strong>Email:</strong> ${volunteer.email}</p>
                <p><strong>Shelter:</strong> ${volunteer.shelter}</p>
                <p><strong>Distance:</strong> ${Math.round(calculateDistance(emergencyAlert.location.lat, emergencyAlert.location.lng, volunteer.coordinates.lat, volunteer.coordinates.lng) * 100) / 100} km</p>
              </div>
            ` : `
              <div style="background: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
                <h3 style="color: #dc2626; margin: 0 0 15px 0;">⚠️ No Volunteers Available</h3>
                <p>No nearby volunteers are currently available for this emergency.</p>
                <p>The alert is pending assignment.</p>
              </div>
            `}

            <div style="text-align: center; margin-top: 30px;">
              <p><strong>Alert ID:</strong> ${emergencyAlert._id}</p>
              <p><strong>Received:</strong> ${new Date(emergencyAlert.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send admin email
    await transporter.sendMail(adminMailOptions);

    console.log(`✅ Notifications sent for emergency alert ${emergencyAlert._id}`);

  } catch (error) {
    console.error('Error sending notifications:', error);
    // Don't throw error - notifications are not critical
  }
};

// Emergency alert endpoint (for detailed alerts with user info - manual assignment only)
router.post("/emergency-alert", async (req, res) => {
  try {
    const {
      victimName,
      victimPhone,
      victimEmail,
      location,
      emergencyType,
      description,
      priority = 'medium'
    } = req.body;

    // Validate required fields
    if (!victimName || !victimPhone || !victimEmail || !location || !emergencyType) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Create emergency alert without automatic assignment
    const emergencyAlert = new EmergencyAlert({
      victimName,
      victimPhone,
      victimEmail,
      location,
      emergencyType,
      description,
      priority,
      status: 'pending' // Admin will manually assign
    });

    await emergencyAlert.save();
    console.log(`🚨 Emergency alert created: ${emergencyAlert._id} - awaiting manual assignment`);

    // Send notification to admin only
    if (transporter) {
      await sendNotifications(emergencyAlert, null, process.env.ADMIN_EMAIL);
    }

    return res.status(200).json({
      success: true,
      message: "Emergency alert received - awaiting manual volunteer assignment",
      data: {
        alertId: emergencyAlert._id,
        status: "pending",
        note: "Alert logged successfully. Admin will assign a volunteer shortly."
      }
    });

  } catch (error) {
    console.error('Emergency alert error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

// Get all emergency alerts (for admin dashboard)
router.get("/emergency-alerts", async (req, res) => {
  try {
    const alerts = await EmergencyAlert.find()
      .populate('assignedVolunteer', 'name email phone')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: alerts
    });
  } catch (error) {
    console.error('Error fetching emergency alerts:', error);
    return res.status(500).json({
      success: false,
      message: "Error fetching emergency alerts",
      error: error.message
    });
  }
});

// Manual volunteer assignment endpoint for admin
router.post("/emergency-alerts/:id/assign-volunteer", async (req, res) => {
  try {
    const { id } = req.params;
    const { volunteerId } = req.body;

    console.log(`🎯 Assignment request: Alert ID: ${id}, Volunteer ID: ${volunteerId}`);

    if (!volunteerId) {
      console.log("❌ No volunteer ID provided");
      return res.status(400).json({
        success: false,
        message: "Volunteer ID is required"
      });
    }

    console.log(`🔍 Looking for alert with ID: ${id}`);
    const alert = await EmergencyAlert.findById(id);
    if (!alert) {
      console.log(`❌ Alert not found: ${id}`);
      return res.status(404).json({
        success: false,
        message: "Emergency alert not found"
      });
    }

    console.log(`🔍 Looking for volunteer with ID: ${volunteerId}`);
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      console.log(`❌ Volunteer not found: ${volunteerId}`);
      return res.status(404).json({
        success: false,
        message: "Volunteer not found"
      });
    }

    console.log(`✅ Found alert: ${alert.emergencyType} and volunteer: ${volunteer.name}`);
    console.log(`📍 Alert location:`, alert.location);
    console.log(`📍 Volunteer coordinates:`, volunteer.coordinates);

    // Assign volunteer to alert
    alert.assignedVolunteer = volunteerId;
    alert.status = 'assigned';
    alert.assignedAt = new Date();
    
    // Set default estimated response time (no location-based calculation)
    alert.estimatedResponseTime = 30; // Default 30 minutes for manual assignments
    console.log(`⏱️ Set default estimated response time: ${alert.estimatedResponseTime} minutes`);

    console.log(`💾 Saving alert with assigned volunteer: ${volunteerId}`);
    await alert.save();

    // Update volunteer status (avoid full validation for legacy records)
    console.log(`💾 Updating volunteer status for: ${volunteer.name}`);
    await Volunteer.findByIdAndUpdate(
      volunteerId,
      {
        $set: {
          isAvailable: false,
          currentTask: alert._id,
          lastActive: new Date()
        },
        $push: {
          tasks: {
            id: alert._id.toString(),
            task: alert.emergencyType || 'Emergency Assistance',
            description: alert.description || `Emergency assistance needed for ${alert.victimName || 'victim'}`,
            assignedAt: alert.assignedAt || new Date(),
            status: 'Pending',
            location: alert.location?.address || volunteer.shelter || 'Unknown location',
            shelter: volunteer.shelter || null,
            victimName: alert.victimName || alert.userName || 'Unknown',
            victimPhone: alert.victimPhone || null,
            emergencyType: alert.emergencyType || 'Emergency',
            estimatedResponseTime: alert.estimatedResponseTime || null,
            emergencyId: alert._id,
            isEmergencyTask: true,
            assignedBy: {
              name: 'Admin',
              email: process.env.ADMIN_EMAIL || null
            }
          }
        }
      },
      { runValidators: false }
    );

    // Send notifications to assigned volunteer
    if (transporter && volunteer.email) {
      console.log(`📧 Sending notification to volunteer: ${volunteer.email}`);
      await sendNotifications(alert, volunteer, process.env.ADMIN_EMAIL);
    }

    console.log(`✅ Volunteer ${volunteer.name} manually assigned to alert ${alert._id}`);

    return res.status(200).json({
      success: true,
      message: "Volunteer assigned successfully",
      data: {
        alertId: alert._id,
        assignedVolunteer: {
          id: volunteer._id,
          name: volunteer.name,
          email: volunteer.email,
          phone: volunteer.phone
        },
        estimatedResponseTime: alert.estimatedResponseTime
      }
    });

  } catch (error) {
    console.error('Error assigning volunteer:', error);
    return res.status(500).json({
      success: false,
      message: "Error assigning volunteer",
      error: error.message
    });
  }
});

// Unassign volunteer from emergency alert
router.post("/emergency-alerts/:id/unassign-volunteer", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`🔄 Unassigning volunteer from alert: ${id}`);

    const alert = await EmergencyAlert.findById(id);
    if (!alert) {
      console.log(`❌ Alert not found: ${id}`);
      return res.status(404).json({
        success: false,
        message: "Emergency alert not found"
      });
    }

    // Get the assigned volunteer before unassigning
    let volunteer = null;
    if (alert.assignedVolunteer) {
      volunteer = await Volunteer.findById(alert.assignedVolunteer);
    }

    // Unassign volunteer from alert
    alert.assignedVolunteer = null;
    alert.status = 'pending';
    alert.assignedAt = null;
    alert.estimatedResponseTime = null;

    await alert.save();

    // Update volunteer status if volunteer exists
    if (volunteer) {
      await Volunteer.findByIdAndUpdate(
        volunteer._id,
        {
          isAvailable: true,
          currentTask: null,
          lastActive: new Date()
        },
        { runValidators: false }
      );
      console.log(`✅ Volunteer ${volunteer.name} is now available again`);
    }

    console.log(`✅ Alert ${alert._id} is now unassigned and pending`);

    return res.status(200).json({
      success: true,
      message: "Volunteer unassigned successfully",
      data: {
        alertId: alert._id,
        status: alert.status
      }
    });

  } catch (error) {
    console.error('Error unassigning volunteer:', error);
    return res.status(500).json({
      success: false,
      message: "Error unassigning volunteer",
      error: error.message
    });
  }
});

// Update emergency alert status
router.put("/emergency-alerts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const alert = await EmergencyAlert.findById(id);
    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Emergency alert not found"
      });
    }

    // Update status
    alert.status = status;
    if (notes) alert.notes = notes;

    // Set completion time if status is completed
    if (status === 'completed') {
      alert.completedAt = new Date();
      if (alert.assignedAt) {
        alert.actualResponseTime = Math.round(
          (alert.completedAt - alert.assignedAt) / (1000 * 60) // minutes
        );
      }

      // Free up the volunteer if task is completed
      if (alert.assignedVolunteer) {
        const volunteer = await Volunteer.findById(alert.assignedVolunteer);
        if (volunteer) {
          volunteer.isAvailable = true;
          volunteer.currentTask = null;
          volunteer.lastActive = new Date();
          await volunteer.save();
        }
      }
    }

    await alert.save();

    return res.status(200).json({
      success: true,
      message: "Emergency alert updated successfully",
      data: alert
    });
  } catch (error) {
    console.error('Error updating emergency alert:', error);
    return res.status(500).json({
      success: false,
      message: "Error updating emergency alert",
      error: error.message
    });
  }
});

// Get tasks assigned to a specific volunteer
router.get("/volunteer-tasks/:volunteerId", async (req, res) => {
  try {
    const { volunteerId } = req.params;

    console.log(`📋 Fetching tasks for volunteer: ${volunteerId}`);

    // Find all emergency alerts assigned to this volunteer
    const assignedAlerts = await EmergencyAlert.find({ 
      assignedVolunteer: volunteerId 
    })
    .populate('assignedVolunteer', 'name email phone')
    .sort({ assignedAt: -1 });

    console.log(`📊 Found ${assignedAlerts.length} assigned tasks`);

    // Transform the data to match the volunteer dashboard format
    const tasks = assignedAlerts.map(alert => ({
      id: alert._id,
      title: `${alert.emergencyType} - ${alert.victimName}`,
      description: alert.description || `Emergency assistance needed for ${alert.victimName}`,
      location: alert.location?.address || alert.userLocation || 'Location not specified',
      status: alert.status === 'assigned' ? 'Pending' : 
              alert.status === 'in_progress' ? 'In Progress' : 
              alert.status === 'completed' ? 'Completed' : 'Pending',
      assignedAt: alert.assignedAt || alert.createdAt,
      emergencyType: alert.emergencyType,
      victimName: alert.victimName,
      victimPhone: alert.victimPhone,
      victimEmail: alert.victimEmail,
      estimatedResponseTime: alert.estimatedResponseTime,
      coordinates: alert.location ? {
        lat: alert.location.lat,
        lng: alert.location.lng
      } : null
    }));

    return res.status(200).json({
      success: true,
      data: tasks
    });

  } catch (error) {
    console.error('Error fetching volunteer tasks:', error);
    return res.status(500).json({
      success: false,
      message: "Error fetching volunteer tasks",
      error: error.message
    });
  }
});

// Get tasks assigned to volunteer by email (for backward compatibility)
router.get("/volunteer-tasks-by-email/:email", async (req, res) => {
  try {
    const { email } = req.params;

    console.log(`📋 Fetching tasks for volunteer email: ${email}`);

    // First find the volunteer by email
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) {
      console.log(`❌ Volunteer not found with email: ${email}`);
      return res.status(404).json({
        success: false,
        message: "Volunteer not found"
      });
    }

    // Find all emergency alerts assigned to this volunteer
    const assignedAlerts = await EmergencyAlert.find({ 
      assignedVolunteer: volunteer._id 
    })
    .populate('assignedVolunteer', 'name email phone')
    .sort({ assignedAt: -1 });

    console.log(`📊 Found ${assignedAlerts.length} assigned tasks for ${email}`);

    // Transform the data to match the volunteer dashboard format
    const tasks = assignedAlerts.map(alert => ({
      id: alert._id,
      title: `${alert.emergencyType} - ${alert.victimName}`,
      description: alert.description || `Emergency assistance needed for ${alert.victimName}`,
      location: alert.location?.address || alert.userLocation || 'Location not specified',
      status: alert.status === 'assigned' ? 'Pending' : 
              alert.status === 'in_progress' ? 'In Progress' : 
              alert.status === 'completed' ? 'Completed' : 'Pending',
      assignedAt: alert.assignedAt || alert.createdAt,
      emergencyType: alert.emergencyType,
      victimName: alert.victimName,
      victimPhone: alert.victimPhone,
      victimEmail: alert.victimEmail,
      estimatedResponseTime: alert.estimatedResponseTime,
      coordinates: alert.location ? {
        lat: alert.location.lat,
        lng: alert.location.lng
      } : null
    }));

    return res.status(200).json(tasks); // Return array directly for backward compatibility

  } catch (error) {
    console.error('Error fetching volunteer tasks by email:', error);
    return res.status(500).json({
      success: false,
      message: "Error fetching volunteer tasks",
      error: error.message
    });
  }
});

// Update task status by volunteer
router.post("/tasks/:taskId/update-status", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status, notes } = req.body;

    console.log(`🔄 Updating task status: ${taskId} -> ${status}`);

    // Validate status
    const validStatuses = ['assigned', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be: assigned, in_progress, or completed"
      });
    }

    // Find and update the emergency alert
    const alert = await EmergencyAlert.findById(taskId);
    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    // Update status
    alert.status = status;
    if (notes) {
      alert.notes = notes;
    }
    
    if (status === 'completed') {
      alert.completedAt = new Date();
      
      // Make volunteer available again
      if (alert.assignedVolunteer) {
        const volunteer = await Volunteer.findById(alert.assignedVolunteer);
        if (volunteer) {
          volunteer.isAvailable = true;
          volunteer.currentTask = null;
          await volunteer.save();
          console.log(`✅ Volunteer ${volunteer.name} is now available again`);
        }
      }
    }

    await alert.save();
    console.log(`✅ Task ${taskId} status updated to: ${status}`);

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: {
        taskId: alert._id,
        status: alert.status,
        completedAt: alert.completedAt
      }
    });

  } catch (error) {
    console.error('Error updating task status:', error);
    return res.status(500).json({
      success: false,
      message: "Error updating task status",
      error: error.message
    });
  }
});

export default router;
