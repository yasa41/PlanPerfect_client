import { useState, useCallback } from 'react';
import { 
  getInviteTemplate, 
  generateInviteText, 
  downloadInvitePdf, 
  sendInviteEmail 
} from '../services/api';

export const useInvite = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetError = useCallback(() => setError(null), []);

  // Get invite template
  const fetchInviteTemplate = useCallback(async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getInviteTemplate(eventId);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch template');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate invite text
  const generateText = useCallback(async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await generateInviteText(eventId);
      return response.data.text;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate text');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Download PDF
  const downloadPdf = useCallback(async (inviteHtml, filename = 'invite.pdf') => {
    setLoading(true);
    setError(null);
    try {
      const response = await downloadInvitePdf(inviteHtml);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate PDF');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Send emails to guests
  const sendEmails = useCallback(async (eventId, subject, inviteHtml) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sendInviteEmail(eventId, subject, inviteHtml);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send emails');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    resetError,
    fetchInviteTemplate,
    generateText,
    downloadPdf,
    sendEmails
  };
};
