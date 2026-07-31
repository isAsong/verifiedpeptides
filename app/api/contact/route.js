// app/api/contact/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 验证必填字段
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // 获取当前日期
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = now.toISOString().replace('T', ' ').slice(0, 19); // YYYY-MM-DD HH:MM:SS

    // 创建按日期分类的文件夹
    const submissionsDir = path.join(process.cwd(), 'submissions', dateStr);
    if (!fs.existsSync(submissionsDir)) {
      fs.mkdirSync(submissionsDir, { recursive: true });
    }

    // CSV 文件路径
    const csvFilePath = path.join(submissionsDir, 'contacts.csv');

    // 准备 CSV 行数据
    const row = [timeStr, name, email, subject || '', message.replace(/,/g, '，').replace(/\n/g, ' ')];

    // 检查文件是否存在，决定是否写入表头
    let csvContent = '';
    if (!fs.existsSync(csvFilePath)) {
      // 文件不存在，写入表头
      const header = ['Timestamp', 'Name', 'Email', 'Subject', 'Message'];
      csvContent = header.join(',') + '\n';
    }

    // 追加数据行（处理特殊字符）
    const escapedRow = row.map(field => `"${field.replace(/"/g, '""')}"`);
    csvContent += escapedRow.join(',') + '\n';

    // 写入文件
    fs.appendFileSync(csvFilePath, csvContent, 'utf8');

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}