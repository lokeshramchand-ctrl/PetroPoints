import React from 'react'
import DashboardSidebar from './DashboardSidebar'

type FeaturePlaceholderProps = {
  title: string
  description: string
}

const FeaturePlaceholder: React.FC<FeaturePlaceholderProps> = ({ title, description }) => {
  return (
    <>
      <style>{`
        .app-container {
          display: flex;
          min-height: 100vh;
          padding: clamp(8px, 2vw, 16px);
          gap: clamp(8px, 2vw, 16px);
          align-items: stretch;
          background: var(--bg-main, #f4f6f8);
        }

        .sidebar {
          flex: 0 0 clamp(200px, 20vw, 280px);
          background-color: var(--surface-main, #ffffff);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          padding: 24px clamp(12px, 1.5vw, 20px);
          box-shadow: var(--shadow-soft, 0 4px 20px rgba(0,0,0,0.02));
          position: sticky;
          top: clamp(8px, 2vw, 16px);
          align-self: stretch;
          min-height: calc(100vh - clamp(16px, 4vw, 32px));
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: var(--surface-main, #ffffff);
          border-radius: 24px;
          box-shadow: var(--shadow-soft, 0 4px 20px rgba(0,0,0,0.02));
          padding: clamp(20px, 4vw, 48px);
        }

        .title {
          margin: 0 0 8px;
          font-size: clamp(24px, 3vw, 36px);
          color: var(--text-main, #111827);
          letter-spacing: -0.03em;
        }

        .description {
          margin: 0;
          font-size: clamp(14px, 1.3vw, 18px);
          color: var(--text-muted, #6b7280);
          max-width: 46ch;
          line-height: 1.55;
        }

        @media (max-width: 64rem) {
          .app-container {
            flex-direction: column;
            padding: 0;
            gap: 0;
          }

          .sidebar {
            width: 100%;
            flex: none;
            min-height: auto;
            position: relative;
            top: 0;
            border-radius: 0;
            box-shadow: none;
            border-bottom: 1px solid var(--border-color, #eaedf1);
          }

          .main-content {
            border-radius: 0;
            box-shadow: none;
            min-height: 60vh;
          }
        }
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-content">
          <h1 className="title">{title}</h1>
          <p className="description">{description}</p>
        </main>
      </div>
    </>
  )
}

export default FeaturePlaceholder
