// Complete shelter data for all 38 districts of Tamil Nadu

export interface Shelter {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  location: {
    lat: number;
    lng: number;
  };
  capacity?: number;
  facilities?: string[];
}

export interface DistrictData {
  district: string;
  shelters: Shelter[];
}

export const allDistrictsShelters: DistrictData[] = [
  {
    district: "Chennai",
    shelters: [
      { id: 1, name: "Chennai Corporation Shelter", address: "123 Anna Salai, Chennai", phone: "+91 7339486437", email: "chennai1@example.com", location: { lat: 13.0635, lng: 80.2297 }, capacity: 500 },
      { id: 2, name: "Red Cross Relief Center", address: "45 Gandhi Nagar, Chennai", phone: "+91 7339486437", email: "chennai2@example.com", location: { lat: 13.0856, lng: 80.2484 }, capacity: 300 },
      { id: 3, name: "Govt. School Shelter", address: "K.K. Nagar, Chennai", phone: "+91 7339486437", email: "chennai3@example.com", location: { lat: 13.0392, lng: 80.2126 }, capacity: 400 },
      { id: 4, name: "Community Hall Shelter", address: "Perambur, Chennai", phone: "+91 7339486437", email: "chennai4@example.com", location: { lat: 13.1131, lng: 80.2214 }, capacity: 250 },
      { id: 5, name: "College Auditorium Shelter", address: "T. Nagar, Chennai", phone: "+91 7339486437", email: "chennai5@example.com", location: { lat: 13.0418, lng: 80.2333 }, capacity: 600 },
    ],
  },
  {
    district: "Coimbatore",
    shelters: [
      { id: 6, name: "Coimbatore Corporation Shelter", address: "RS Puram, Coimbatore", phone: "+91 7339486437", email: "coimbatore1@example.com", location: { lat: 11.0168, lng: 76.9558 }, capacity: 450 },
      { id: 7, name: "Govt. College Relief Center", address: "Gandhipuram, Coimbatore", phone: "+91 7339486437", email: "coimbatore2@example.com", location: { lat: 11.0183, lng: 76.9725 }, capacity: 350 },
      { id: 8, name: "Community Center Shelter", address: "Saibaba Colony, Coimbatore", phone: "+91 7339486437", email: "coimbatore3@example.com", location: { lat: 11.0234, lng: 76.9625 }, capacity: 300 },
    ],
  },
  {
    district: "Madurai",
    shelters: [
      { id: 9, name: "Madurai Corporation Shelter", address: "Anna Nagar, Madurai", phone: "+91 7339486437", email: "madurai1@example.com", location: { lat: 9.9252, lng: 78.1198 }, capacity: 400 },
      { id: 10, name: "Meenakshi Temple Relief Center", address: "Near Temple, Madurai", phone: "+91 7339486437", email: "madurai2@example.com", location: { lat: 9.9195, lng: 78.1193 }, capacity: 500 },
      { id: 11, name: "Govt. School Shelter", address: "K.K. Nagar, Madurai", phone: "+91 7339486437", email: "madurai3@example.com", location: { lat: 9.9312, lng: 78.1089 }, capacity: 350 },
    ],
  },
  {
    district: "Tiruchirappalli",
    shelters: [
      { id: 12, name: "Trichy Corporation Shelter", address: "Thillai Nagar, Trichy", phone: "+91 7339486437", email: "trichy1@example.com", location: { lat: 10.7905, lng: 78.7047 }, capacity: 400 },
      { id: 13, name: "Rock Fort Relief Center", address: "Near Rock Fort, Trichy", phone: "+91 7339486437", email: "trichy2@example.com", location: { lat: 10.8155, lng: 78.6900 }, capacity: 300 },
    ],
  },
  {
    district: "Salem",
    shelters: [
      { id: 14, name: "Salem Corporation Shelter", address: "Cherry Road, Salem", phone: "+91 7339486437", email: "salem1@example.com", location: { lat: 11.6643, lng: 78.1460 }, capacity: 350 },
      { id: 15, name: "Govt. Hospital Relief Center", address: "Fairlands, Salem", phone: "+91 7339486437", email: "salem2@example.com", location: { lat: 11.6532, lng: 78.1588 }, capacity: 400 },
    ],
  },
  {
    district: "Tirunelveli",
    shelters: [
      { id: 16, name: "Tirunelveli Corporation Shelter", address: "Town Hall, Tirunelveli", phone: "+91 7339486437", email: "tirunelveli1@example.com", location: { lat: 8.7139, lng: 77.7567 }, capacity: 350 },
      { id: 17, name: "Govt. College Shelter", address: "Palayamkottai, Tirunelveli", phone: "+91 7339486437", email: "tirunelveli2@example.com", location: { lat: 8.7289, lng: 77.7456 }, capacity: 400 },
    ],
  },
  {
    district: "Cuddalore",
    shelters: [
      { id: 18, name: "Cuddalore Relief Camp 1", address: "Silver Beach Road, Cuddalore", phone: "+91 7339486437", email: "cuddalore1@example.com", location: { lat: 11.7361, lng: 79.7686 }, capacity: 300 },
      { id: 19, name: "Cuddalore Relief Camp 2", address: "Old Town Hall, Cuddalore", phone: "+91 7339486437", email: "cuddalore2@example.com", location: { lat: 11.746, lng: 79.764 }, capacity: 250 },
      { id: 20, name: "Cyclone Relief Center", address: "Port Area, Cuddalore", phone: "+91 7339486437", email: "cuddalore3@example.com", location: { lat: 11.735, lng: 79.765 }, capacity: 350 },
    ],
  },
  {
    district: "Nagapattinam",
    shelters: [
      { id: 21, name: "Nagapattinam Relief Camp 1", address: "Harbor Road, Nagapattinam", phone: "+91 7339486437", email: "nagapattinam1@example.com", location: { lat: 10.763, lng: 79.843 }, capacity: 300 },
      { id: 22, name: "Nagapattinam Relief Camp 2", address: "Town Hall, Nagapattinam", phone: "+91 7339486437", email: "nagapattinam2@example.com", location: { lat: 10.765, lng: 79.84 }, capacity: 400 },
      { id: 23, name: "Cyclone Shelter", address: "Seashore Road, Nagapattinam", phone: "+91 7339486437", email: "nagapattinam3@example.com", location: { lat: 10.758, lng: 79.842 }, capacity: 350 },
    ],
  },
  {
    district: "Thoothukudi",
    shelters: [
      { id: 24, name: "Thoothukudi Relief Camp 1", address: "Beach Road, Thoothukudi", phone: "+91 7339486437", email: "thoothukudi1@example.com", location: { lat: 8.805, lng: 78.15 }, capacity: 300 },
      { id: 25, name: "Thoothukudi Relief Camp 2", address: "Old Harbor Area, Thoothukudi", phone: "+91 7339486437", email: "thoothukudi2@example.com", location: { lat: 8.81, lng: 78.145 }, capacity: 350 },
    ],
  },
  {
    district: "Kanyakumari",
    shelters: [
      { id: 26, name: "Kanyakumari Relief Camp 1", address: "Near Beach, Kanyakumari", phone: "+91 7339486437", email: "kanyakumari1@example.com", location: { lat: 8.0883, lng: 77.5385 }, capacity: 400 },
      { id: 27, name: "Kanyakumari Relief Camp 2", address: "Town Hall, Kanyakumari", phone: "+91 7339486437", email: "kanyakumari2@example.com", location: { lat: 8.09, lng: 77.54 }, capacity: 300 },
    ],
  },
  {
    district: "Vellore",
    shelters: [
      { id: 28, name: "Vellore Fort Shelter", address: "Near Fort, Vellore", phone: "+91 7339486437", email: "vellore1@example.com", location: { lat: 12.9165, lng: 79.1325 }, capacity: 350 },
      { id: 29, name: "CMC Hospital Relief Center", address: "CMC Campus, Vellore", phone: "+91 7339486437", email: "vellore2@example.com", location: { lat: 12.9259, lng: 79.1364 }, capacity: 400 },
    ],
  },
  {
    district: "Erode",
    shelters: [
      { id: 30, name: "Erode Corporation Shelter", address: "Perundurai Road, Erode", phone: "+91 7339486437", email: "erode1@example.com", location: { lat: 11.3410, lng: 77.7172 }, capacity: 300 },
      { id: 31, name: "Govt. College Shelter", address: "Rangampalayam, Erode", phone: "+91 7339486437", email: "erode2@example.com", location: { lat: 11.3524, lng: 77.7268 }, capacity: 350 },
    ],
  },
  {
    district: "Tiruppur",
    shelters: [
      { id: 32, name: "Tiruppur Corporation Shelter", address: "Kumaran Road, Tiruppur", phone: "+91 7339486437", email: "tiruppur1@example.com", location: { lat: 11.1085, lng: 77.3411 }, capacity: 350 },
      { id: 33, name: "Textile Park Relief Center", address: "Avinashi Road, Tiruppur", phone: "+91 7339486437", email: "tiruppur2@example.com", location: { lat: 11.0975, lng: 77.3398 }, capacity: 300 },
    ],
  },
  {
    district: "Thanjavur",
    shelters: [
      { id: 34, name: "Thanjavur Palace Shelter", address: "Near Palace, Thanjavur", phone: "+91 7339486437", email: "thanjavur1@example.com", location: { lat: 10.7870, lng: 79.1378 }, capacity: 400 },
      { id: 35, name: "Govt. Medical College Shelter", address: "Medical College Road, Thanjavur", phone: "+91 7339486437", email: "thanjavur2@example.com", location: { lat: 10.7905, lng: 79.1378 }, capacity: 450 },
    ],
  },
  {
    district: "Dindigul",
    shelters: [
      { id: 36, name: "Dindigul Corporation Shelter", address: "Anna Nagar, Dindigul", phone: "+91 7339486437", email: "dindigul1@example.com", location: { lat: 10.3673, lng: 77.9803 }, capacity: 300 },
      { id: 37, name: "Rock Fort Relief Center", address: "Near Fort, Dindigul", phone: "+91 7339486437", email: "dindigul2@example.com", location: { lat: 10.3624, lng: 77.9734 }, capacity: 350 },
    ],
  },
  {
    district: "Karur",
    shelters: [
      { id: 38, name: "Karur Corporation Shelter", address: "Thanthoni Road, Karur", phone: "+91 7339486437", email: "karur1@example.com", location: { lat: 10.9601, lng: 78.0766 }, capacity: 300 },
    ],
  },
  {
    district: "Ramanathapuram",
    shelters: [
      { id: 39, name: "Ramanathapuram Relief Center", address: "Town Hall, Ramanathapuram", phone: "+91 7339486437", email: "ramanathapuram1@example.com", location: { lat: 9.3647, lng: 78.8378 }, capacity: 350 },
      { id: 40, name: "Coastal Shelter", address: "Beach Road, Ramanathapuram", phone: "+91 7339486437", email: "ramanathapuram2@example.com", location: { lat: 9.3712, lng: 78.8456 }, capacity: 300 },
    ],
  },
  {
    district: "Virudhunagar",
    shelters: [
      { id: 41, name: "Virudhunagar Corporation Shelter", address: "Sivakasi Road, Virudhunagar", phone: "+91 7339486437", email: "virudhunagar1@example.com", location: { lat: 9.5810, lng: 77.9624 }, capacity: 300 },
    ],
  },
  {
    district: "Pudukkottai",
    shelters: [
      { id: 42, name: "Pudukkottai Palace Shelter", address: "Near Palace, Pudukkottai", phone: "+91 7339486437", email: "pudukkottai1@example.com", location: { lat: 10.3833, lng: 78.8000 }, capacity: 300 },
    ],
  },
  {
    district: "Sivaganga",
    shelters: [
      { id: 43, name: "Sivaganga Relief Center", address: "Town Hall, Sivaganga", phone: "+91 7339486437", email: "sivaganga1@example.com", location: { lat: 9.8433, lng: 78.4809 }, capacity: 300 },
    ],
  },
  {
    district: "Theni",
    shelters: [
      { id: 44, name: "Theni Corporation Shelter", address: "Periyakulam Road, Theni", phone: "+91 7339486437", email: "theni1@example.com", location: { lat: 10.0104, lng: 77.4776 }, capacity: 300 },
    ],
  },
  {
    district: "Namakkal",
    shelters: [
      { id: 45, name: "Namakkal Fort Shelter", address: "Near Fort, Namakkal", phone: "+91 7339486437", email: "namakkal1@example.com", location: { lat: 11.2189, lng: 78.1677 }, capacity: 300 },
    ],
  },
  {
    district: "Dharmapuri",
    shelters: [
      { id: 46, name: "Dharmapuri Corporation Shelter", address: "Salem Road, Dharmapuri", phone: "+91 7339486437", email: "dharmapuri1@example.com", location: { lat: 12.1211, lng: 78.1582 }, capacity: 300 },
    ],
  },
  {
    district: "Krishnagiri",
    shelters: [
      { id: 47, name: "Krishnagiri Corporation Shelter", address: "Hosur Road, Krishnagiri", phone: "+91 7339486437", email: "krishnagiri1@example.com", location: { lat: 12.5186, lng: 78.2137 }, capacity: 300 },
    ],
  },
  {
    district: "Ariyalur",
    shelters: [
      { id: 48, name: "Ariyalur Relief Center", address: "Town Hall, Ariyalur", phone: "+91 7339486437", email: "ariyalur1@example.com", location: { lat: 11.1401, lng: 79.0782 }, capacity: 250 },
    ],
  },
  {
    district: "Perambalur",
    shelters: [
      { id: 49, name: "Perambalur Shelter", address: "Main Road, Perambalur", phone: "+91 7339486437", email: "perambalur1@example.com", location: { lat: 11.2324, lng: 78.8800 }, capacity: 250 },
    ],
  },
  {
    district: "Nilgiris",
    shelters: [
      { id: 50, name: "Ooty Hill Station Shelter", address: "Charring Cross, Ooty", phone: "+91 7339486437", email: "nilgiris1@example.com", location: { lat: 11.4102, lng: 76.6950 }, capacity: 350 },
      { id: 51, name: "Coonoor Relief Center", address: "Bedford, Coonoor", phone: "+91 7339486437", email: "nilgiris2@example.com", location: { lat: 11.3524, lng: 76.7963 }, capacity: 300 },
    ],
  },
  {
    district: "Tiruvannamalai",
    shelters: [
      { id: 52, name: "Tiruvannamalai Temple Shelter", address: "Near Temple, Tiruvannamalai", phone: "+91 7339486437", email: "tiruvannamalai1@example.com", location: { lat: 12.2253, lng: 79.0747 }, capacity: 400 },
    ],
  },
  {
    district: "Viluppuram",
    shelters: [
      { id: 53, name: "Viluppuram Corporation Shelter", address: "Trichy Road, Viluppuram", phone: "+91 7339486437", email: "viluppuram1@example.com", location: { lat: 11.9401, lng: 79.4861 }, capacity: 300 },
    ],
  },
  {
    district: "Kallakurichi",
    shelters: [
      { id: 54, name: "Kallakurichi Relief Center", address: "Main Road, Kallakurichi", phone: "+91 7339486437", email: "kallakurichi1@example.com", location: { lat: 11.7390, lng: 78.9597 }, capacity: 250 },
    ],
  },
  {
    district: "Tirupathur",
    shelters: [
      { id: 55, name: "Tirupathur Shelter", address: "Ambur Road, Tirupathur", phone: "+91 7339486437", email: "tirupathur1@example.com", location: { lat: 12.4961, lng: 78.5730 }, capacity: 250 },
    ],
  },
  {
    district: "Ranipet",
    shelters: [
      { id: 56, name: "Ranipet Corporation Shelter", address: "Vellore Road, Ranipet", phone: "+91 7339486437", email: "ranipet1@example.com", location: { lat: 12.9249, lng: 79.3308 }, capacity: 300 },
    ],
  },
  {
    district: "Tenkasi",
    shelters: [
      { id: 57, name: "Tenkasi Relief Center", address: "Courtallam Road, Tenkasi", phone: "+91 7339486437", email: "tenkasi1@example.com", location: { lat: 8.9579, lng: 77.3152 }, capacity: 300 },
    ],
  },
  {
    district: "Tirupattur",
    shelters: [
      { id: 58, name: "Tirupattur Shelter", address: "Main Road, Tirupattur", phone: "+91 7339486437", email: "tirupattur1@example.com", location: { lat: 12.4961, lng: 78.5730 }, capacity: 250 },
    ],
  },
  {
    district: "Chengalpattu",
    shelters: [
      { id: 59, name: "Chengalpattu Corporation Shelter", address: "GST Road, Chengalpattu", phone: "+91 7339486437", email: "chengalpattu1@example.com", location: { lat: 12.6922, lng: 79.9768 }, capacity: 350 },
      { id: 60, name: "Mahabalipuram Relief Center", address: "Beach Road, Mahabalipuram", phone: "+91 7339486437", email: "chengalpattu2@example.com", location: { lat: 12.6269, lng: 80.1932 }, capacity: 300 },
    ],
  },
  {
    district: "Kanchipuram",
    shelters: [
      { id: 61, name: "Kanchipuram Temple Shelter", address: "Near Temple, Kanchipuram", phone: "+91 7339486437", email: "kanchipuram1@example.com", location: { lat: 12.8342, lng: 79.7036 }, capacity: 400 },
    ],
  },
  {
    district: "Tiruvallur",
    shelters: [
      { id: 62, name: "Tiruvallur Corporation Shelter", address: "Poonamallee Road, Tiruvallur", phone: "+91 7339486437", email: "tiruvallur1@example.com", location: { lat: 13.1434, lng: 79.9098 }, capacity: 350 },
    ],
  },
  {
    district: "Mayiladuthurai",
    shelters: [
      { id: 63, name: "Mayiladuthurai Relief Center", address: "Kumbakonam Road, Mayiladuthurai", phone: "+91 7339486437", email: "mayiladuthurai1@example.com", location: { lat: 11.1025, lng: 79.6537 }, capacity: 300 },
    ],
  },
];

// Helper function to get all shelters as a flat array
export const getAllShelters = (): Shelter[] => {
  return allDistrictsShelters.flatMap(district => 
    district.shelters.map(shelter => ({
      ...shelter,
      district: district.district
    }))
  );
};

// Helper function to get shelter names for dropdown
export const getShelterOptions = (): { value: string; label: string; district: string }[] => {
  return allDistrictsShelters.flatMap(district =>
    district.shelters.map(shelter => ({
      value: shelter.id.toString(),
      label: `${shelter.name} (${district.district})`,
      district: district.district
    }))
  );
};

// Helper function to get districts list
export const getDistricts = (): string[] => {
  return allDistrictsShelters.map(d => d.district);
};
