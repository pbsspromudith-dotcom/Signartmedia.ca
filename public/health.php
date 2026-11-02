<?php
/**
 * Sign Art Media - Hostinger / Apache Server Diagnostic & Health Check
 * Access at: https://signartmedia.ca/health.php
 */
header('Content-Type: text/html; charset=UTF-8');

$serverSoftware = isset($_SERVER['SERVER_SOFTWARE']) ? $_SERVER['SERVER_SOFTWARE'] : 'Unknown';
$phpVersion = phpversion();
$isHttps = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');
$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'localhost';

$indexExists = file_exists(__DIR__ . '/index.html');
$htaccessExists = file_exists(__DIR__ . '/.htaccess');
$nextDirExists = is_dir(__DIR__ . '/_next');
$staticDirExists = is_dir(__DIR__ . '/_next/static');

$cssFiles = glob(__DIR__ . '/_next/static/chunks/*.css');
$jsFiles = glob(__DIR__ . '/_next/static/chunks/*.js');
$cssCount = $cssFiles ? count($cssFiles) : 0;
$jsCount = $jsFiles ? count($jsFiles) : 0;

$allEntries = scandir(__DIR__);
$backslashEntries = array_filter($allEntries, function($name) {
    return strpos($name, '\\') !== false;
});
$hasBackslashIssue = !empty($backslashEntries);

$isHealthy = $indexExists && $htaccessExists && $nextDirExists && $staticDirExists;
$appStatus = $isHealthy ? 'HEALTHY' : ($hasBackslashIssue ? 'CORRUPTED_EXTRACTION' : 'INCOMPLETE');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign Art Media - Server Health & Diagnostics</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #f5f2eb;
      color: #121212;
      padding: 40px 20px;
      margin: 0;
    }
    .card {
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #d8d3c5;
      padding: 30px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .badge {
      display: inline-block;
      padding: 6px 14px;
      font-size: 13px;
      font-weight: bold;
      color: #fff;
      background: <?php echo $isHealthy ? '#16a34a' : '#eb3b14'; ?>;
    }
    h1 {
      font-size: 24px;
      margin-top: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    td {
      padding: 10px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
    }
    td.label {
      font-weight: 600;
      color: #555;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background: #eb3b14;
      color: white;
      text-decoration: none;
      font-weight: bold;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge"><?php echo $appStatus; ?></span>
    <h1>Sign Art Media (signartmedia.ca) Status</h1>
    <table>
      <tr><td class="label">Host</td><td><?php echo htmlspecialchars($host); ?></td></tr>
      <tr><td class="label">SSL / HTTPS</td><td><?php echo $isHttps ? 'Enabled (Secure)' : 'Not Enabled'; ?></td></tr>
      <tr><td class="label">Web Server</td><td><?php echo htmlspecialchars($serverSoftware); ?></td></tr>
      <tr><td class="label">index.html</td><td><?php echo $indexExists ? '✓ Present' : '✗ Missing'; ?></td></tr>
      <tr><td class="label">.htaccess Routing</td><td><?php echo $htaccessExists ? '✓ Active' : '✗ Missing'; ?></td></tr>
      <tr><td class="label">Next.js Assets</td><td><?php echo $nextDirExists ? '✓ Present' : '✗ Missing'; ?></td></tr>
      <tr><td class="label">Windows Backslash Issue</td><td><?php echo $hasBackslashIssue ? '✗ Detected (Re-extract)' : '✓ Clean'; ?></td></tr>
    </table>
    <a href="/" class="btn">Go to Sign Art Media Home &rarr;</a>
  </div>
</body>
</html>

