export const updateWorkflow = async (id: string, data: any) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/workflow/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}