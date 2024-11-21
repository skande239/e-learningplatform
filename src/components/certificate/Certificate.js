import React from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CertificateContainer = styled.div`
  width: 800px;
  height: 600px;
  padding: 40px;
  border: 2px solid #gold;
  text-align: center;
  background: #fff;
  position: relative;
`;

const CertificateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function Certificate({ courseTitle, studentName, completionDate }) {
  const downloadCertificate = () => {
    const certificate = document.getElementById('certificate');
    
    html2canvas(certificate).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', [297, 210]);
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
      pdf.save(`certificate-${courseTitle}.pdf`);
    });
  };

  return (
    <div>
      <CertificateContainer id="certificate">
        <CertificateContent>
          <h1>شهادة إتمام</h1>
          <p>هذه الشهادة تؤكد أن</p>
          <h2>{studentName}</h2>
          <p>قد أتم بنجاح دورة</p>
          <h3>{courseTitle}</h3>
          <p>بتاريخ: {completionDate}</p>
        </CertificateContent>
      </CertificateContainer>
      <button onClick={downloadCertificate}>
        تحميل الشهادة
      </button>
    </div>
  );
}

export default Certificate; 