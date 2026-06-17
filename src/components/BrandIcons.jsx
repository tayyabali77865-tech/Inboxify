import React from 'react';

export const BrandIcons = {
  WhatsApp: (props) => (
    <img 
      src="https://play-lh.googleusercontent.com/Gqxk4T0uZsDwFp07DE-508hkyvcNmgFuRwPiwTEfF7D7OzGv1FdHDzEyMxNsSBZLOJlGpe3ULvVM2RgrRAlBqA"
      alt="WhatsApp"
      style={{ width: '100%', height: '100%', objectFit: 'contain', ...props.style }}
    />
  ),
  Instagram: (props) => (
    <img 
      src="https://unblast.com/wp-content/uploads/2025/07/instagram-logo-colored.jpg"
      alt="Instagram"
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', ...props.style }}
    />
  ),
  Messenger: (props) => (
    <img 
      src="https://static.vecteezy.com/system/resources/previews/021/495/995/non_2x/messenger-social-media-logo-icon-free-png.png"
      alt="Messenger"
      style={{ width: '100%', height: '100%', objectFit: 'contain', ...props.style }}
    />
  ),
  Telegram: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="12" fill="#229ED9"/>
      <path fill="#ffffff" d="M9.78 18.65l.28-4.21L17.7 7.22c.33-.29-.07-.45-.51-.15l-9.83 6.19-4.08-1.28c-.89-.28-.91-.89.19-1.32L19.27 4.12c1.2-.44 2.25.29 1.85 1.95l-3.23 15.22c-.24 1.13-.91 1.41-1.85.87l-4.76-3.51-2.3 2.21c-.25.26-.46.47-.95.47z" transform="scale(0.7) translate(5.1, 4.8)"/>
    </svg>
  ),
  Discord: (props) => (
    <img 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8aMugg7LWDXqkWc-9JlApM4MLPXhi-EPDYA&s"
      alt="Discord"
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', ...props.style }}
    />
  ),
  'X/Twitter': (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="12" fill="#000000"/>
      <path fill="#ffffff" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" transform="scale(0.65) translate(6.5, 6.5)"/>
    </svg>
  ),
  TikTok: (props) => (
    <img 
      src="https://img.magnific.com/premium-vector/tik-tok-logo_578229-290.jpg?semt=ais_hybrid&w=740&q=80"
      alt="TikTok"
      style={{ width: '120%', height: '120%', objectFit: 'cover', objectPosition: 'center', ...props.style }}
    />
  ),
  Snapchat: (props) => (
    <img 
      src="https://cdn.prod.website-files.com/666d73652dd00cac579627ec/67767f942c4928d932dc4f37_67767e2671f2ed8d606a3302_Icon.jpeg"
      alt="Snapchat"
      style={{ width: '120%', height: '120%', objectFit: 'cover', objectPosition: 'center', ...props.style }}
    />
  ),
  Gmail: (props) => (
    <img 
      src="https://images.icon-icons.com/2642/PNG/512/google_mail_gmail_logo_icon_159346.png"
      alt="Gmail"
      style={{ width: '100%', height: '100%', objectFit: 'contain', ...props.style }}
    />
  ),
  Messages: (props) => (
    <img 
      src="https://img.phonandroid.com/2022/12/Google-Messages-Logo.jpg"
      alt="Messages"
      style={{ 
        width: '100%', 
        height: '100%', 
        borderRadius: '50%', 
        objectFit: 'contain', 
        backgroundColor: '#ffffff', 
        padding: '1px', 
        boxSizing: 'border-box', 
        ...props.style 
      }}
    />
  )
};

export function BrandIcon({ name, ...props }) {
  const Icon = BrandIcons[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}
