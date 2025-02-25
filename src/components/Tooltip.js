import React from 'react';
import { addNewAccount } from '../utils/api';
export const Tooltip = ({ tooltipText, children }) => {
  return (
    <div className="tooltip-wrapper">
      {children}
      <div className="tooltip-text">{tooltipText}</div>
    </div>
  );
};

export const DropdownTooltip = ({
  hubs,
  children,
  generateButton,
  handleHubSelection,
  token,
}) => {
  const handleAddNewAccount = async () => {
    const result = await addNewAccount(token);
    document.cookie = `state=${
      result?.state
    }; path=/; SameSite=Lax; Secure; max-age=${60 * 60 * 24}`;
    window.location.href = result?.redirect_url;
  };
  return (
    <div className="tooltip-wrapper">
      {children}
      <div className="tooltip-content">
        {hubs.map((hub) => (
          <div
            key={hub.hub_id}
            style={{
              cursor: generateButton ? 'not-allowed' : 'pointer',
              opacity: generateButton ? 0.6 : 1,
            }}
            onClick={() => handleHubSelection(hub)}
          >
            Hub ID: {hub.hub_id} ({hub.hub_domain})
          </div>
        ))}
        <button
          //     onClick={() => {
          //       window.location.href = `https://app.hubspot.com/oauth/authorize
          // ?client_id=e2c4a7c0-aba4-48b6-a94b-b1d3e233f22b
          // &redirect_uri=https://enabling-condor-instantly.ngrok-free.app/getcode
          // &scope=tickets%20crm.objects.owners.read%20crm.objects.companies.read
          // %20crm.objects.deals.read%20crm.objects.contacts.read&state=${token}`.replace(
          //         /\s+/g,
          //         '',
          //       );
          //     }}
          onClick={() => {
            handleAddNewAccount(token);
          }}
          style={{
            width: '20vw',
            opacity: generateButton ? 0.6 : 1,
            cursor: generateButton ? 'not-allowed' : 'pointer',
            alignSelf: 'center',
          }}
        >
          + Add New Portal
        </button>
      </div>
    </div>
  );
};
