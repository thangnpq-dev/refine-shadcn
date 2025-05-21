"use client";

import React from "react";
import { useTable } from "@refinedev/core";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TrialData {
  id: number;
  name: string;
  status: string;
  date: string;
  value: number;
}

export default function TrialTablePage() {
  // Sample data for the trial table
  const sampleData: TrialData[] = [
    { id: 1, name: "Trial 1", status: "Active", date: "2025-01-01", value: 100 },
    { id: 2, name: "Trial 2", status: "Inactive", date: "2025-01-02", value: 200 },
    { id: 3, name: "Trial 3", status: "Active", date: "2025-01-03", value: 300 },
    { id: 4, name: "Trial 4", status: "Pending", date: "2025-01-04", value: 400 },
    { id: 5, name: "Trial 5", status: "Active", date: "2025-01-05", value: 500 },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Trial Table</CardTitle>
        <CardDescription>
          A sample trial table using shadcn UI components
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>List of trial items</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell className="text-right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
