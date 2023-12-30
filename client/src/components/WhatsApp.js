const WhatsApp = () => {
  return (
    <>
      <a
        href='https://wa.me/21620532181'
        className='whatsapp_float'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Contact us on WhatsApp'
      >
        <span className='visually-hidden'>Contact us on WhatsApp</span>
        <i className='bi bi-whatsapp whatsapp-icon' aria-hidden='true' />
      </a>
    </>
  );
};

export default WhatsApp;
