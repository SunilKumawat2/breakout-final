// 'use client'
// import React from 'react'
// import { Modal } from 'react-bootstrap'
// import close from '@/images/close.svg'
// import Image from 'next/image'

// export const CommonModal = ({ show, handleClose, children, className = "" }) => {
  
//   return (
//     <Modal show={show} onHide={handleClose} centered className={`common-modal ${className}`} data-lenis-prevent>
      
//       <Modal.Body data-lenis-prevent className={`${className}`}>
//         <div className='common-modal-content'>
//             <button className='close-btn' onClick={handleClose}>
//                 <Image src={close} alt='close' />
//             </button>
//             {children}
//         </div>
//       </Modal.Body>
//     </Modal>
//   )
// }

'use client'
import React from 'react'
import { Modal } from 'react-bootstrap'
import close from '@/images/close.svg'
import Image from 'next/image'
import { useGlobalContext } from '@/context/GlobalContext'

export const CommonModal = ({
  show,
  handleClose,
  children,
  className = "",
  onReleaseSeats,
}) => {
  const {releaseSeats} = useGlobalContext();
  const handleModalClose = async () => {
    try {

      // 🔥 release held seats first
      if (onReleaseSeats) {
        await releaseSeats();
      }

    } catch (error) {
      console.log("Release seats error", error);
    } finally {

      // close modal
      handleClose();

      // 🔥 hard refresh page
      window.location.reload();
    }
  };
  // releaseSeats
  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      centered
      className={`common-modal ${className}`}
      data-lenis-prevent
    >

      <Modal.Body
        data-lenis-prevent
        className={`${className}`}
      >
        <div className='common-modal-content'>

          <button
            className='close-btn'
            onClick={handleModalClose}
          >
            <Image src={close} alt='close' />
          </button>

          {children}

        </div>
      </Modal.Body>
    </Modal>
  )
}