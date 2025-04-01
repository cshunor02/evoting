import { useState, useEffect, useCallback } from "react";

export default function useCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all candidates
  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/candidates");
      if (!res.ok) throw new Error("Failed to fetch candidates");
      const data = await res.json();
      setCandidates(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  // Fetch a single candidate
  const getCandidate = useCallback(async (id) => {
    try {
      const res = await fetch(`/api/candidates/${id}`);
      if (!res.ok) throw new Error("Candidate not found");
      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Add new candidate
  const addCandidate = useCallback(async (name) => {
    try {
      const res = await fetch("/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Failed to add candidate");
      const newCandidate = await res.json();
      setCandidates((prev) => [...prev, newCandidate]);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Update candidate
  const updateCandidate = useCallback(async (id, newName) => {
    try {
      const res = await fetch(`/api/candidates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) throw new Error("Failed to update candidate");
      const updatedCandidate = await res.json();
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? updatedCandidate : c))
      );
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Delete candidate
  const deleteCandidate = useCallback(async (id) => {
    try {
      const res = await fetch(`/api/candidates/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete candidate");
      setCandidates((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return {
    candidates,
    loading,
    error,
    fetchCandidates,
    getCandidate,
    addCandidate,
    updateCandidate,
    deleteCandidate,
  };
}
