import React, { useEffect, useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import { fetchAuditData } from '../utils/api';
import Modal from '../components/Modal';
import '../styles/AuditReport.scss';
import Companies from './companies';
import Contacts from './contacts';
import Deals from './deals';
import Tickets from './tickets';

export default function AuditReport() {
  const [auditData, setAuditData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDetailsExpanded, setisDetailsExpanded] = useState(false);
  const [id, setId] = useState('001');
  const [createDate, setCreateDate] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDetailsSection = () => {
    setisDetailsExpanded(!isDetailsExpanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAuditData();
      setId(response?.id);
      setAuditData(response);
      setCreateDate(response.createDate);
    };
    fetchData();
  }, []);

  if (!auditData) {
    return <div>Loading...</div>;
  }

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const { overallScore, globalAverage, industryAverage, scores, dataAudit } =
    auditData;

  return (
    <div className="audit-report">
      <header className="audit-report__header">
        <div className="audit-report__header-section">
          <button className="audit-report__header-button">Reports</button>
          <span className="audit-report__icon">&#62;</span>
          <button className="audit-report__header-button">
            Id: {id} | {createDate}
          </button>
        </div>
      </header>

      {/* Overall Audit Score */}
      <section className="audit-report__section">
        <h3 className="audit-report__overall_title">Overall Audit Score</h3>
        <div className="audit-report__score">
          <ProgressBar score={overallScore} maxScore={100} height={3} />
        </div>
        <p className="audit-report__main_heading">
          You are <strong>{globalAverage - overallScore}</strong> points behind
          the Global Average and{' '}
          <strong>{industryAverage - overallScore}</strong> points behind your
          Industry Average.
        </p>
      </section>

      {/* Detailed Scores Section */}
      <section className="audit-report__section">
        <div className="audit-report__section-header">
          <h3 className="audit-report__subtitle">Detailed Audit Scores</h3>
          <button
            className="audit-report__toggle-button"
            onClick={toggleDetailsSection}
          >
            {isDetailsExpanded ? '-' : '^'}
          </button>
        </div>

        {isDetailsExpanded && (
          <div className="audit-report__details">
            {Object.entries(scores).map(([key, value]) => (
              <ProgressBar
                key={key}
                label={key
                  .replace(/Audit/g, '')
                  .replace(/([a-z])([A-Z])/g, '$1 $2')}
                score={value}
                maxScore={100}
              />
            ))}
          </div>
        )}
      </section>

      {/* Data Audit Section */}
      <section className="audit-report__section">
        <div className="audit-report__section-header">
          <h3 className="audit-report__subtitle">Data Audit</h3>
          <button
            className="audit-report__toggle-button"
            onClick={toggleSection}
          >
            {isExpanded ? '−' : '^'}
          </button>
        </div>

        {isExpanded && (
          <div className="audit-report__data">
            <div className="audit-report__data-item">
              <div className="audit-report__data-div">
                <div
                  className="audit-report__data-item"
                  onClick={() => openModal(<Contacts />)}
                >
                  <p className="audit-report__data-div-heading">Contacts</p>
                  <p className="audit-report__data-div-score">
                    {dataAudit.contacts}/
                    <span className="audit-report__data-div-hundred">100</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="audit-report__data-item">
              <div className="audit-report__data-div">
                <div
                  className="audit-report__data-item"
                  onClick={() => openModal(<Companies />)}
                >
                  <p className="audit-report__data-div-heading">Companies</p>
                  <p className="audit-report__data-div-score">
                    {dataAudit.companies}/
                    <span className="audit-report__data-div-hundred">100</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="audit-report__data-item">
              <div className="audit-report__data-div">
                <div
                  className="audit-report__data-item"
                  onClick={() => openModal(<Deals />)}
                >
                  <p className="audit-report__data-div-heading">Deals</p>
                  <p className="audit-report__data-div-score">
                    {dataAudit.deals}/
                    <span className="audit-report__data-div-hundred">100</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="audit-report__data-item">
              <div className="audit-report__data-div">
                <div
                  className="audit-report__data-item"
                  onClick={() => openModal(<Tickets />)}
                >
                  <p className="audit-report__data-div-heading">Tickets</p>
                  <p className="audit-report__data-div-score">
                    {dataAudit.tickets ? (
                      <>
                        {dataAudit.tickets}/
                        <span className="audit-report__data-div-hundred">
                          100
                        </span>
                      </>
                    ) : (
                      <span className="audit-report__unavailable">
                        Not in Use
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
}
