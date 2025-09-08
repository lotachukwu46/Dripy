// utils/emailTemplates/baseTemplate.js
export const baseTemplate = (title, content) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      .header {
        background: #4f46e5;
        color: white;
        text-align: center;
        padding: 20px;
        font-size: 20px;
      }
      .content {
        padding: 30px;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 24px;
        background: #4f46e5;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        color: #777;
        padding: 10px;
        background: #f9f9f9;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">${title}</div>
      <div class="content">
        ${content}
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Your App Name. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};
