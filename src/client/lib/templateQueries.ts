import { mutationOptions, queryOptions } from "@tanstack/react-query";
import {
	fetchTemplateFormDefaults,
	fetchTemplateTableRows,
	submitTemplateForm,
	type TemplateFormValues,
} from "./templateData.ts";

export const templateFormDefaultsQueryOptions = queryOptions({
	queryKey: ["template", "form", "defaults"],
	queryFn: fetchTemplateFormDefaults,
});

export const templateTableRowsQueryOptions = queryOptions({
	queryKey: ["template", "table", "rows"],
	queryFn: fetchTemplateTableRows,
});

export function templateFormSubmitMutationOptions() {
	return mutationOptions({
		mutationKey: ["template", "form", "submit"],
		mutationFn: (values: TemplateFormValues) => submitTemplateForm(values),
	});
}
