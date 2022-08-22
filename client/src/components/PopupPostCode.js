import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const PopupPostCode = ({onClose, setAddress}) => {
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if(data.addressType === 'R') {
            if(data.bname !== '') {
                extraAddress += data.bname;
            }
            if(data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `,${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? `(${extraAddress})` : '');
        }
        onClose();
        setAddress(fullAddress);
    }

    return (
        <div>
            <DaumPostcode onComplete={handlePostCode}/>
            <button type='button' onClick={() => {onClose()}}>닫기</button>
        </div>
    )
}

export default PopupPostCode;