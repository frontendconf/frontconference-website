import Airtable, { type FieldSet } from "airtable";
import type { APIRoute } from "astro";

const { AIRTABLE_BASE, AIRTABLE_API_KEY } = import.meta.env;

type Field = {
	name: string;
	type:
		| "text"
		| "email"
		| "hidden"
		| "file"
		| "checkbox"
		| "textarea"
		| "select";
	label?: string;
	value?: string;
	description?: string;
	required?: boolean;
	checked?: boolean;
	cfsOnly?: boolean;
	maxLength?: number;
	options?: string[];
};

type FieldGroup = {
	title: string;
	description: string;
	fields: Field[];
	cfsOnly?: boolean;
};

type FieldGroups = Record<string, FieldGroup[]>;

type HiddenFields = Record<string, Field[]>;

export type GetResponse = {
	fieldGroups: FieldGroup[];
	hiddenFields: Field[];
};

export const ALL: APIRoute = async ({ request }) => {
	// Handle missing airtable env variables
	if (!(AIRTABLE_API_KEY && AIRTABLE_BASE)) {
		return new Response(
			JSON.stringify({
				message: `Application error: Could not find Airtable API key.`,
			}),
			{
				status: 500,
			},
		);
	}

	const defaultFieldGroups: FieldGroup[] = [
		{
			title: "Speaking Experience",
			description:
				"Please link to any video of a prior talk you've given. If there is no video available we need another way of assessing your presentation skills, e.g. by an experienced speaker vouching for you. If you don't have any speaking experience we would love for you to apply for our <a href='/call-for-speakers-bootcamp-application'>Speakers Bootcamp</a>!",
			fields: [
				{
					name: "Speaking Experience",
					type: "textarea",
					required: true,
				},
			],
			cfsOnly: true,
		},
		{
			title: "Talk",
			description: "Please tell us about your presentation.",
			fields: [
				{
					name: "Talk Title",
					type: "text",
					required: true,
				},
				{
					name: "Talk Details",
					type: "textarea",
					description:
						"What is your talk about and what is the audience going to learn?",
					required: true,
					maxLength: 1000,
				},
				{
					name: "Talk Abstract",
					type: "text",
					description: "How can the talk details be summarized.",
					required: true,
					maxLength: 250,
				},
			],
		},
		{
			title: "Personal Information",
			description:
				"Please provide some personal information so we get an idea about who you are.",
			fields: [
				{ name: "Name", type: "text", required: true },
				{
					name: "Location",
					type: "text",
					description: "City and country",
					required: true,
				},
				{
					name: "Biography",
					type: "textarea",
					label: "Biography",
					description:
						"What is your professional background? What would the audience need to know about you?",
					required: true,
					maxLength: 1000,
				},
				{
					name: "Email",
					type: "email",
					description:
						"We will use this email address to communicate with you.",
					required: true,
				},
			],
		},
	];
	const fieldGroups: FieldGroups = {
		"Call for Speakers": defaultFieldGroups,
		"Speakers Bootcamp": defaultFieldGroups
			.filter((group) => !group.cfsOnly)
			.map((group) => ({
				...group,
				fields: group.fields.filter((field) => !field.cfsOnly),
			})),
	};

	const defaultHiddenFields: Field[] = [
		{ name: "Call for Speakers", value: "true", type: "hidden" },
	];
	const hiddenFields: HiddenFields = {
		"Call for Speakers": defaultHiddenFields,
		"Speakers Bootcamp": defaultHiddenFields.concat([
			{ name: "Bootcamp", value: "true", type: "hidden" },
		]),
	};

	const id = new URL(request.url).searchParams.get("id");

	if (!(id && Object.keys(fieldGroups).includes(id))) {
		return new Response(
			JSON.stringify({
				message: `Application error: Could not find Airtable API key.`,
			}),
			{
				status: 500,
			},
		);
	}

	if (request.method === "POST") {
		const body = await request.formData();

		try {
			const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
				AIRTABLE_BASE,
			);

			const fieldConfigs = fieldGroups[id]
				.reduce((acc: Field[], group) => {
					acc = acc.concat(group.fields);

					return acc;
				}, [])
				.concat(hiddenFields[id]);

			let data: FieldSet = {};

			for (const [key, value] of body) {
				if (value) {
					const fieldConfig = fieldConfigs.find((field) => field.name === key);

					if (fieldConfig) {
						if (["true", "false"].includes(String(value))) {
							data[key] = Boolean(value);
						} else {
							data[key] = String(value);
						}
					}
				}
			}

			console.log("Airtable submission (data):", data);

			// Save to Airtable
			await base("Speakers").create([
				{
					fields: data,
				},
			]);

			return new Response(
				JSON.stringify({
					message: `Thank you for the submission!`,
				}),
			);
		} catch (err) {
			console.log(body);
			console.log(err);

			return new Response(
				JSON.stringify({
					message: `We are very sorry, but something went wrong. Please try again. If it still doesn't work, you can submit your proposal via e-mail. Clicking <a href="mailto:thomas@frontconference.com?subject=Proposal&body=${encodeURIComponent(
						JSON.stringify(body),
					)}">this link</a> will create a message with the data you already entered into the form below.`,
				}),
				{
					status: 500,
				},
			);
		}
	}

	return new Response(
		JSON.stringify({
			fieldGroups: fieldGroups[id],
			hiddenFields: hiddenFields[id],
		}),
	);
};
