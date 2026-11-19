import React, { useState } from 'react';

export default function BookmakerForm() {
  const [form, setForm] = useState({
    sbobetLimit: '5000',
    pinnacleLimit: '10000',
  });
  const [saved, setSaved] = useState(false);

  function handleonChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setSaved(false);
  }

  function handlesubmit(e) {
    e.preventDefault();
    console.log('Submitted bookmaker limits:', form);
    setSaved(true);
  }

  function handleBookieLogin(bookieName) {
    console.log(`Opening ${bookieName} login...`);
    
  }

  return (
    <>
      <style>{`
        .inline-bookie-form {
          margin-top: 20px;
          padding: 16px 20px;
          background-color: rgba(14, 21, 26, 0.85);
          border: 1px solid rgba(14, 76, 189, 0.2);
          border-radius: 12px;
          max-width: 600px;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 12px;
          color: #e5e7eb;
        }

        .bookie-row {
          display: grid;
          grid-template-columns: 1.6fr 1fr auto;
          gap: 10px;
          align-items: center;
        }

        .bookie-info {
          display: flex;
          flex-direction: column;
        }

        .bookie-info strong {
          font-size: 13.5px;
          color: #f9fafb;
        }

        .bookie-info small {
          color: #9ca3af;
          font-size: 11.5px;
          line-height: 1.3;
        }

        .inline-bookie-form input {
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #374151;
          background: #111827;
          color: #fff;
          font-size: 13px;
          width: 100%;
          box-sizing: border-box;
        }

        .inline-bookie-form input:focus {
          outline: none;
          border-color:brown

        }

        .btn-bookie-login {
          padding: 8px 14px;
          background: transparent;
          color: #474a49;
          border: 1px solid #30a4e3;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background-color 0.18s ease, color 0.18s ease;
        }

        .btn-bookie-login:hover {
          background: #108fb9;
          color: #111827;
        }

        .btn-submit {
          align-self: flex-end;
          padding: 8px 16px;
          background: #237bf6;
          color: #111827;
          font-weight: 700;
          font-size: 13px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        @media (max-width: 640px) {
          .bookie-row {
            grid-template-columns: 1fr;
          }
          .btn-bookie-login,
          .btn-submit {
            width: 100%;
          }
        }
      `}</style>

      <form className="inline-bookie-form" onSubmit={handlesubmit}>
        <div className="bookie-row">
          <div className="bookie-info">
            <strong>SBOBET</strong>
            <small>High Asian Handicap limits • Winners welcome</small>
          </div>
          <input
            type="number"
            name="sbobetLimit"
            placeholder="Max Stake ($)"
            value={form.sbobetLimit}
            onChange={handleonChange}
            required
          />
          <button
            type="button"
            className="btn-bookie-login"
            onClick={() => handleBookieLogin('SBOBET')}
          >
            Login
          </button>
        </div>

        <div className="bookie-row">
          <div className="bookie-info">
            <strong>Pinnacle</strong>
            <small>Min $1–$2, high dynamic limits peaking near kickoff</small>
          </div>
          <input
            type="number"
            name="pinnacleLimit"
            placeholder="Max Stake ($)"
            value={form.pinnacleLimit}
            onChange={handleonChange}
            required
          />
          <button
            type="button"
            className="btn-bookie-login"
            onClick={() => handleBookieLogin('Pinnacle')}
          >
            Login
          </button>
        </div>

        <button type="submit" className="btn-submit">
          {saved ? '✓ Saved' : 'Save Limits'}
        </button>
      </form>
    </>
  );
}

