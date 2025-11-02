import { ConnectButton, useCurrentAccount, useSignPersonalMessage } from '@mysten/dapp-kit';
import { useState } from 'react';

export default function WalletConnect() {
  const account = useCurrentAccount();
  const { mutate: signMessage } = useSignPersonalMessage();
  const [signature, setSignature] = useState<string>('');

  const handleSignCheckIn = () => {
    if (!account) return;
    
    const message = new TextEncoder().encode('SUV OneHack Check-in: ' + new Date().toISOString());
    
    signMessage(
      { message },
      {
        onSuccess: (result) => {
          setSignature(result.signature);
          console.log('Signed:', result);
        },
        onError: (error) => {
          console.error('Sign error:', error);
        },
      },
    );
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', margin: '20px' }}>
      <h3>OneWallet Integration</h3>
      
      <ConnectButton />
      
      {account && (
        <div style={{ marginTop: '10px' }}>
          <p>Connected: {account.address.slice(0, 6)}...{account.address.slice(-4)}</p>
          
          <button 
            onClick={handleSignCheckIn}
            style={{ padding: '10px', marginTop: '10px', cursor: 'pointer' }}
          >
            Sign Check-in
          </button>
          
          {signature && (
            <div style={{ marginTop: '10px', wordBreak: 'break-all' }}>
              <strong>Signature:</strong> {signature.slice(0, 20)}...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
