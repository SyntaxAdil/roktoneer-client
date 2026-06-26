"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import DonationReqCard from "../../../components/donor/DonationReqCard";
import NoReq from "../../../components/donor/NoReq";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";

export default function DonationRequestPage({ 
  initialRequests = [], 
  initialTotalPages = 1,
  initialTotalItems = 0 
}) {
  const [requests, setRequests] = useState(initialRequests);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalItems, setTotalItems] = useState(initialTotalItems);

  const fetchPageData = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/public-pending?page=${pageNumber}&limit=8`
      );
      const result = await res.json();
      if (result.success) {
        setRequests(result.data);
        setTotalPages(result.totalPages || 1);
        setTotalItems(result.totalItems || 0);
        setCurrentPage(pageNumber);
      }
    } catch (error) {
      console.error("Error fetching paginated data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage, e) => {
    if (e) e.preventDefault();
    if (newPage >= 1 && newPage <= totalPages) {
      fetchPageData(newPage);
    }
  };

  return (
    <section className="w-full py-20 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full"
          >
            Emergency Board
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Active Blood <span className="text-red-600">Requests</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400"
          >
            Review immediate requirements. Your single decision can alter someone&apos;s timeline completely.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 w-full gap-2">
            <Loader2 className="size-8 animate-spin text-red-500" />
            <p className="text-xs font-medium text-zinc-400">Loading requests...</p>
          </div>
        ) : requests.length > 0 ? (
          <div className="flex flex-col gap-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
            >
              {requests.map((req) => (
                <DonationReqCard key={req._id || req.id} req={req} />
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="py-4 border-t border-zinc-200/60 dark:border-zinc-800/60 mt-4">
                <Pagination>
                  <PaginationContent>
                    
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => handlePageChange(currentPage - 1, e)}
                        className={currentPage === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      if (
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={currentPage === page}
                              onClick={(e) => handlePageChange(page, e)}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      
                      return null;
                    })}

                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => handlePageChange(currentPage + 1, e)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer"}
                      />
                    </PaginationItem>

                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        ) : (
          <NoReq />
        )}

      </div>
    </section>
  );
}