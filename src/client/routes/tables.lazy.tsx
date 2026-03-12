import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import type { TemplateTableRow } from "../lib/templateData.ts";
import { templateTableRowsQueryOptions } from "../lib/templateQueries.ts";
import { useGlobalPageHeader } from "../pageHeaderSlots.ts";

const columnHelper = createColumnHelper<TemplateTableRow>();

export const Route = createLazyFileRoute("/tables")({
	component: TablesTemplatePage,
});

function TablesTemplatePage() {
	const { setPageHeaderSlots, clearPageHeaderSlots } = useGlobalPageHeader();
	const tableQuery = useQuery(templateTableRowsQueryOptions);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 4,
	});

	const data = useMemo(() => tableQuery.data ?? [], [tableQuery.data]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("name", {
				header: "Service",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("owner", {
				header: "Owner",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("status", {
				header: "Status",
				cell: (info) => (
					<span className="rounded-full border border-kumo-line px-2 py-0.5 text-xs uppercase">
						{info.getValue()}
					</span>
				),
			}),
			columnHelper.accessor("region", {
				header: "Region",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("requests", {
				header: "Requests",
				cell: (info) => info.getValue().toLocaleString(),
			}),
			columnHelper.accessor("updatedAt", {
				header: "Updated",
				cell: (info) => info.getValue(),
			}),
		],
		[],
	);

	const table = useReactTable({
		data,
		columns,
		state: { sorting, globalFilter, pagination },
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	useEffect(() => {
		setPageHeaderSlots({
			eyebrow: "Template UI",
			title: "TanStack Table",
			description:
				"A reusable table template with query-backed data, sorting, filtering, and pagination.",
			metadata: (
				<>
					<span>Rows: {data.length}</span>
					<span>Data: TanStack Query</span>
				</>
			),
			status: tableQuery.isFetching ? "Refreshing rows..." : "Ready",
		});

		return clearPageHeaderSlots;
	}, [clearPageHeaderSlots, data.length, setPageHeaderSlots, tableQuery.isFetching]);

	return (
		<section className="space-y-4 rounded-xl border border-kumo-line bg-kumo-elevated p-4 md:p-6">
			<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
				<input
					value={globalFilter}
					onChange={(event) => setGlobalFilter(event.target.value)}
					placeholder="Filter all columns"
					className="w-full rounded-md border border-kumo-line bg-kumo-base px-3 py-2 text-sm md:max-w-sm"
				/>
				<button
					type="button"
					onClick={() => tableQuery.refetch()}
					className="rounded-md border border-kumo-line px-3 py-2 text-sm"
				>
					Refresh Data
				</button>
			</div>

			<div className="overflow-x-auto rounded-lg border border-kumo-line">
				<table className="w-full min-w-[760px] border-collapse text-left text-sm">
					<thead className="bg-kumo-fill">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="border-b border-kumo-line px-3 py-2 font-medium"
									>
										{header.isPlaceholder ? null : (
											<button
												type="button"
												onClick={header.column.getToggleSortingHandler()}
												className="inline-flex items-center gap-1"
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
												{header.column.getIsSorted() === "asc" ? "↑" : null}
												{header.column.getIsSorted() === "desc" ? "↓" : null}
											</button>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="odd:bg-kumo-base even:bg-kumo-elevated">
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="border-b border-kumo-line px-3 py-2">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex flex-wrap items-center gap-2 border-t border-kumo-line pt-3 text-sm">
				<button
					type="button"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					className="rounded-md border border-kumo-line px-3 py-1.5 disabled:opacity-50"
				>
					Previous
				</button>
				<button
					type="button"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					className="rounded-md border border-kumo-line px-3 py-1.5 disabled:opacity-50"
				>
					Next
				</button>
				<span className="text-kumo-subtle">
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</span>
			</div>
		</section>
	);
}
