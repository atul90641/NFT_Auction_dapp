import { useEffect, useState } from "react";
import './styles.css';
import { connectToWallet, getContract, mintNFT, configureTokenURI, } from "./util/EtherJSFunctions";
import myFunction from './otherScript';

export default function App() {
  const [contract, setContract] = useState(null);
  const [wallet, setWallet] = useState(null);
  const pinataApiKey = 'ffaea6a1a199b47b8917';
  const pinataSecretApiKey = 'a1b5c7a96db2e5169cd6e61f4f3b1d6e8fd33f39205e71048d6388496ced99d6';
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [value, setValue] = useState('');
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };
  // const evaluate = async () => {

  const handleSubmit = async (event) => {
    setButtonDisabled(true);
    event.preventDefault();

    const jsonData = {
      "name": "Butterfly Token",
      "description": "",
      "image": value,
      "artist": "Atul Kumar",
      "creationDate": "2023-07-01",
      "customAttribute": "Custom value"
    }

    const fileName = 'neww.json';
    const content = JSON.stringify(jsonData);

    const formData = new FormData();
    formData.append('file', new Blob([content], { type: 'application/json' }), fileName);

    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        body: formData,
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data.IpfsHash);
        let final = 'ipfs://'+data.IpfsHash+'/';
        await mintNFT(final, contract);
        alert('your nft is minted now');
        window.location.reload();
        return (data.IpfsHash);
      } else {
        alert('Error uploading file:', response.status);
        window.location.reload();
      }
    } catch (error) {
      alert('Error uploading file:', error);
      window.location.reload();
    }

  };

  const loadImage = () => {
    setValue(myFunction());
  }

  useEffect(async () => {
    const signer = await connectToWallet();
    if ((await signer.getAddress()) !== "") {
      setWallet(signer);
      const erc721SC = await getContract(signer);
      setContract(erc721SC);
    }
  }, []);


  return (

    <div className="App">

      <header>

        <div>
          <p className='header-title'>Enter your URL of image for minting the NFT</p>

          <div>
            <form onSubmit={handleSubmit} className='search-container'>
              <input type="text" className='boxField' value={value} onChange={handleInputChange} placeholder="URL" />
              
              <button type="submit" disabled={buttonDisabled || value.trim() === ''}  className='search-button'>Submit</button>
            </form>
            
          </div>

          <div>
            <p className='nft-title'>  Your NFT will look like this</p>
            <p>  <img src={value} className='photo' />  </p>
            <button onClick={loadImage} className='search-button center'>Load Image</button>
          </div>

        </div>
      </header>

    </div>
  );


}
