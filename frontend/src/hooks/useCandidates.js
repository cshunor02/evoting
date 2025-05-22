import { useState, useEffect, useCallback } from "react";

export default function useCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



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
