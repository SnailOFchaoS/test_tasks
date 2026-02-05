import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ taskId: string }> | { taskId: string } }
) {
	try {
		const resolvedParams = await Promise.resolve(params);
		const taskId = resolvedParams.taskId;
		
		const commentsFilePath = path.join(process.cwd(), 'data', `comments-${taskId}.txt`);
		
		console.log('Reading comments file:', commentsFilePath);
		const fileContents = await fs.readFile(commentsFilePath, 'utf8');
		console.log('File contents length:', fileContents.length);
		
		return NextResponse.json({ text: fileContents });
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
			console.log('Comments file not found for taskId:', (await Promise.resolve(params)).taskId);
			return NextResponse.json({ text: '' });
		}
		console.error('Error reading comments file:', error);
		return NextResponse.json({ error: 'Failed to read comments file' }, { status: 500 });
	}
}
