'use client';

export default function DirectTestPage() {
  return (
    <div style={{
      padding: '20px',
      background: 'yellow',
      border: '5px solid red',
      minHeight: '300px',
      color: 'black',
      fontWeight: 'bold'
    }}>
      <h1 style={{fontSize: '24px'}}>DIRECT TEST PAGE</h1>
      <p>This page is outside the dashboard group</p>
    </div>
  );
}
