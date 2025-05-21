"use client";

import { GetManyResponse, useMany, useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";
import { Button } from "@components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
} from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { 
  Plus, 
  ChevronsLeft, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsRight,
  Eye,
  Pencil
} from "lucide-react";

export default function BlogPostList() {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
        size: 60,
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
      },
      {
        id: "content",
        accessorKey: "content",
        header: "Content",
        cell: function render({ getValue }) {
          const content = getValue<string>() || "";
          // Truncate content for display
          return content.length > 50 ? `${content.substring(0, 50)}...` : content;
        },
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoryData: GetManyResponse;
          };

          try {
            const category = meta.categoryData?.data?.find(
              (item) => item.id == getValue<any>()?.id
            );

            return category?.title ? (
              <Badge variant="outline" className="bg-primary/10">
                {category.title}
              </Badge>
            ) : (
              "Loading..."
            );
          } catch (error) {
            return null;
          }
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: function render({ getValue }) {
          const status = getValue<string>();
          return (
            <Badge className={status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
              {status}
            </Badge>
          );
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: function render({ getValue }) {
          return new Date(getValue<any>()).toLocaleString(undefined, {
            timeZone: "UTC",
          });
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => {
                  show("blog_posts", getValue() as string);
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => {
                  edit("blog_posts", getValue() as string);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const { edit, show, create } = useNavigation();

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      tableQueryResult: { data: tableData },
    },
    getState,
    setPageIndex,
    getCanPreviousPage,
    getPageCount,
    getCanNextPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable({
    columns,
  });

  const { data: categoryData } = useMany({
    resource: "categories",
    ids:
      tableData?.data?.map((item) => item?.category?.id).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableData?.data,
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoryData,
    },
  }));

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col space-y-6">
        {/* Header with title and create button */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">Blog Posts</h1>
          <Button 
            onClick={() => create("blog_posts")} 
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Post
          </Button>
        </div>
        
        {/* Main table card */}
        <Card className="border shadow-sm">
          <CardContent className="p-0">
            <div className="rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  {getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="font-medium">
                          {!header.isPlaceholder &&
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {getRowModel().rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    getRowModel().rows.map((row) => (
                      <TableRow key={row.id} className="hover:bg-muted/50">
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          
          {/* Pagination controls */}
          <CardFooter className="flex items-center justify-between px-6 py-4 border-t">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div>
                Page <span className="font-medium">{getState().pagination.pageIndex + 1}</span> of{" "}
                <span className="font-medium">{getPageCount() || 1}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setPageIndex(0)}
                disabled={!getCanPreviousPage()}
              >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">First page</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => previousPage()}
                disabled={!getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => nextPage()}
                disabled={!getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setPageIndex(getPageCount() - 1)}
                disabled={!getCanNextPage()}
              >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Last page</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}