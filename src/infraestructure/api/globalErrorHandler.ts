export default function globalErrorHandler(error: any, req: any, res: any, next: any) {
    res.status(500).json({ error: error.message });
}
