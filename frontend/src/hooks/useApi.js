// src/hooks/useApi.js
import axios from 'axios';
import { useState } from 'react';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const API_BASE = import.meta.env.VITE_API_URL;

export const useApp = () => useContext(AppContext);

export function useApi(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/${endpoint}`);
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const postData = async (payload) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/${endpoint}`, payload);
      setData(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data || 'Error posting data');
    } finally {
      setLoading(false);
    }
  };

  const putData = async (id, payload) => {
    setLoading(true);
    try {
      const res = await axios.put(`${API_BASE}/${endpoint}/${id}`, payload);
      setData(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data || 'Error updating data');
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${API_BASE}/${endpoint}/${id}`);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data || 'Error deleting data');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData, postData, putData, deleteData };
}
