"use client";

import { useState, useCallback, useEffect } from "react";

export const useSearch = (onSearch: (query: string) => void, delay: number = 500) => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
      setIsTyping(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay, onSearch]);

  const handleChange = useCallback((value: string) => {
    setQuery(value);
    setIsTyping(true);
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch("");
    setIsTyping(false);
  }, [onSearch]);

  return {
    query,
    isTyping,
    handleChange,
    handleClear,
  };
};