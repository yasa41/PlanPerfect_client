import { useState, useCallback } from 'react';
import { 
  uploadPhotosAPI, 
  getEventPhotosAPI, 
  deletePhotoAPI, 
  sendPhotosToRsvpGuestsAPI 
} from '../services/api.js'; // Your main API file

export const usePhotos = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  const resetError = useCallback(() => setError(null), []);

  // 1. FETCH PHOTOS for event
  const fetchPhotos = useCallback(async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEventPhotosAPI(eventId);
      setPhotos(response.data.photos || []);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch photos';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. UPLOAD PHOTOS
  const addPhotos = useCallback(async (eventId, files) => {
    setLoading(true);
    setError(null);
    try {
      const response = await uploadPhotosAPI(eventId, files);
      setPhotos(prev => [...response.data.photos, ...prev]);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to upload photos';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. DELETE PHOTO
  const removePhoto = useCallback(async (photoId) => {
    setLoading(true);
    setError(null);
    try {
      await deletePhotoAPI(photoId);
      setPhotos(prev => prev.filter(p => p._id !== photoId));
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete photo';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 4. SEND PHOTOS TO RSVP GUESTS
  const sendPhotosToRsvpGuests = useCallback(async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sendPhotosToRsvpGuestsAPI(eventId);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to send photos';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    loading, 
    photos, 
    error, 
    resetError,
    fetchPhotos, 
    addPhotos, 
    removePhoto, 
    sendPhotosToRsvpGuests 
  };
};
