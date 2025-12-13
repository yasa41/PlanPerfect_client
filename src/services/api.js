import axios from "axios";

// Axios Instances

const authAPI = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH,
  withCredentials: true,
});

const eventTypeAPI = axios.create({
  baseURL: import.meta.env.VITE_API_TYPE,
  withCredentials: true,
});

const eventAPI = axios.create({
  baseURL: import.meta.env.VITE_API_EVENT,
  withCredentials: true,
});

const guestAPI = axios.create({
  baseURL: import.meta.env.VITE_API_GUEST,
  withCredentials: true,
});

const budgetAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BUDGET,
  withCredentials: true,
});
const todoAPI = axios.create({
  baseURL: import.meta.env.VITE_API_TODO,
  withCredentials: true,
});
const vendorAPI = axios.create({
  baseURL: import.meta.env.VITE_API_VENDOR,
  withCredentials: true,
});

const inviteAPI = axios.create({
  baseURL: import.meta.env.VITE_API_INVITE,
  withCredentials: true,
});

const photoAPI = axios.create({
  baseURL: import.meta.env.VITE_API_PHOTO,
  withCredentials: true,
});

authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// AUTH APIs
export const registerUser = (name, email, password, phone) => {
  return authAPI.post("/register", { name, email, password, phone });
};

export const loginUser = (data) => {
  return authAPI.post("/login",  data);
};

export const logoutUser = () => authAPI.post("/logout");

export const requestPasswordReset = (email) => {
  return authAPI.post("/forgot-password", { email });
};

// EVENT TYPE APIs
export const fetchAllEventTypes = () => eventTypeAPI.get("/");
export const fetchEventTypeByName = (name) => eventTypeAPI.get(`/${name}`);

// EVENT APIs
export const listEvents = () => eventAPI.get("/");
export const getEventById = (id) => eventAPI.get(`/${id}`);

export const getWorkingEvents = () =>
  eventAPI.get("/working/list");

export const addWorkingEvent = (eventId) =>
  eventAPI.post("/working/add", { eventId });

export const removeWorkingEvent = (eventId) =>
  eventAPI.post("/working/remove", { eventId });

export const createEvent = (data) => {
  // data = { title, description, date, venue, eventType }
  return eventAPI.post("/create", data);
};

// GUEST APIs

export const fetchGuestsByEvent = (eventId) =>
  guestAPI.get(`/${eventId}`);

// Add guest to event
export const addGuest = (eventId, guestData) =>
  guestAPI.post(`/add`, { eventId, ...guestData });

// Update RSVP status for a guest
export const updateRsvp = (guestId, rsvpStatus) =>
  guestAPI.post(`/update-rsvp`, { guestId, rsvpStatus });

// RSVP via link (GET, for direct email links)
export const rsvpViaLink = (guestId, action) =>
  guestAPI.get(`/rsvp/${guestId}/${action}`);

// Budget API

export const fetchBudgetByEvent = (eventId) =>
  budgetAPI.get(`/${eventId}`);

// Set or update the total budget
export const setOrUpdateBudget = (eventId, totalBudget) =>
  budgetAPI.post(`/set`, { eventId, totalBudget });

// Add an expense
export const addExpense = (eventId, description, amount) =>
  budgetAPI.post(`/expense`, { eventId, description, amount });

// TODO API 
export const fetchToDoListByEvent = (eventId) =>
  todoAPI.get(`/${eventId}`);

// Add task to event
export const addTaskToEvent = (eventId, description) =>
  todoAPI.post(`/add`, { eventId, description });


// Delete task from event
export const deleteTaskFromEvent = (eventId, taskId) =>
  todoAPI.post(`/delete`, { eventId, taskId });

// Update an event's task (status or description)
export const updateTaskInEvent = (eventId, taskId, updates = {}) =>
  todoAPI.post(`/update`, { eventId, taskId, ...updates });

// ------Vendor API----------

export const fetchVendorsByEvent = (eventId) =>
  vendorAPI.get(`/${eventId}`);

export const addVendorToEvent = (eventId, name, email, phoneNo, estimate, details) =>
  vendorAPI.post("/add", { eventId, name, email, phoneNo, estimate, details });

export const updateVendorDetails = (vendorId, updates = {}) =>
  vendorAPI.post("/update", { vendorId, ...updates });

export const deleteVendorById = (vendorId) =>
  vendorAPI.post("/delete", { vendorId });


// INVITE APIs

export const getInviteTemplate = (eventId) => 
  inviteAPI.get(`/template/${eventId}`);

// Generate AI invite text from event details
export const generateInviteText = (eventId) => 
  inviteAPI.post('/generate-text', { eventId });

// Download invite PDF from HTML
export const downloadInvitePdf = (inviteHtml) => 
  inviteAPI.post('/download-pdf', { inviteHtml }, {
    responseType: 'blob'
  });

// Send invite emails to all guests
export const sendInviteEmail = (eventId, subject, inviteHtml) => 
  inviteAPI.post('/send-emails', { eventId, subject, inviteHtml });

// PHOTO APIs
export const uploadPhotosAPI = (eventId, files) => {
  const formData = new FormData();
  formData.append('eventId', eventId);
  files.forEach((file) => formData.append('photos', file));
  
  return photoAPI.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// PHOTO APIs (UPDATE THESE 3)
export const getEventPhotosAPI = (eventId) => 
  photoAPI.get(`/event/${eventId}`);  // ← CHANGED

export const deletePhotoAPI = (photoId) => 
  photoAPI.delete(`/photo/${photoId}`);  // ← CHANGED

// uploadPhotosAPI and sendPhotosToRsvpGuestsAPI stay the same


export const sendPhotosToRsvpGuestsAPI = (eventId) => 
  photoAPI.post('/send-to-rsvp', { eventId });


// ================= PHONE OTP AUTH APIs =================

// Request OTP via phone (Forgot password)
export const requestPasswordResetByPhone = (phone) => {
  return authAPI.post("/forgot-password-phone", { phone });
};

// Verify phone OTP
export const verifyPhoneOtp = (phone, otp) => {
  return authAPI.post("/verify-phone-otp", { phone, otp });
};

// Reset password using phone
export const resetPasswordByPhone = (phone, newPassword) => {
  return authAPI.post("/reset-password-phone", { phone, newPassword });
};
