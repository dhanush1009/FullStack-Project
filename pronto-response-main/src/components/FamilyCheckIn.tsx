// src/components/EmergencyRequests.js
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EmergencyRequests() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    location: "",
    items: "",
    urgency: "Normal",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.location || !form.items) {
      alert("Please fill all required fields");
      return;
    }
    setRequests([{ ...form, status: "Pending" }, ...requests]);
    setForm({
      name: "",
      contact: "",
      location: "",
      items: "",
      urgency: "Normal",
    });
  };

  const updateStatus = (index, status) => {
    const updated = [...requests];
    updated[index].status = status;
    setRequests(updated);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🚨 Emergency Supply Requests</h1>

      {/* Request Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 bg-white shadow-lg p-4 rounded-xl mb-6"
      >
        <Input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
        />
        <Input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <Textarea
          name="items"
          placeholder="Required Items (e.g., Food, Water, Medicines)"
          value={form.items}
          onChange={handleChange}
        />
        <select
          name="urgency"
          value={form.urgency}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="Normal">Normal</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
        <Button type="submit" className="bg-red-600 hover:bg-red-700">
          Submit Request
        </Button>
      </form>

      {/* Requests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.length === 0 ? (
          <p className="text-gray-500">No requests yet.</p>
        ) : (
          requests.map((req, index) => (
            <Card
              key={index}
              className="shadow-lg border border-gray-200 rounded-xl"
            >
              <CardContent className="p-4">
                <h2 className="font-bold text-lg">{req.items}</h2>
                <p className="text-sm text-gray-600">📍 {req.location}</p>
                <p className="text-sm">👤 {req.name}</p>
                <p className="text-sm">📞 {req.contact}</p>
                <p
                  className={`text-sm font-semibold mt-2 ${
                    req.urgency === "Critical"
                      ? "text-red-600"
                      : req.urgency === "High"
                      ? "text-orange-500"
                      : "text-green-600"
                  }`}
                >
                  Urgency: {req.urgency}
                </p>
                <p className="text-sm mt-1">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      req.status === "Pending"
                        ? "text-yellow-600"
                        : req.status === "In Progress"
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>

                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={() => updateStatus(index, "In Progress")}
                  >
                    In Progress
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => updateStatus(index, "Fulfilled")}
                  >
                    Fulfilled
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
