export const handleError = (message: string = 'Unexpected error', status = 400) => {
  return Response.json({ error: { message } }, { status });
};

export const handleJson = (obj: any, status = 200) => {
  return Response.json(obj, { status });
};
