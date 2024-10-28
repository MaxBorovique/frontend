const footerLinks = [
  {
    name: "Telegram",
    url: "https://t.me/MaksymBorovyk",
    imageUrl: "./telegram.svg",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/maksym-borovyk-a38872331/",
    imageUrl: "./linkedin.svg",
  },
  {
    name: "GitHub",
    url: "https://github.com/MaxBorovique",
    imageUrl: "./github.svg",
  },
  {
    name: "Phone",
    url: "tel:+380633368400",
    imageUrl: "./phone.svg",
  },
  {
    name: "Email",
    url: "mailto:borovyk.maxym@gmail.com?subject=I want to hire you!&body=Our company has an offer for you!.",
    imageUrl: "./email.svg",
  },
  {
    name: "Discord",
    url: "https://discord.gg/JFN6sXdKqR",
    imageUrl: "./discord.svg",
  },
];

export const Footer = () => {
  return (
    <footer className=" bg-cards-bg dark:bg-dark-cards-bg">
      <div className="flex items-center justify-between p-10">
        <div className="flex justify-start max-w-[240px] overflow-visible hover:scale-150 transition-all duration-300">
          <a href="#">
            <div className="bg-[url('/logo.svg')] min-w-[76px] h-12 bg-no-repeat bg-center bg-cover"></div>
          </a>
        </div>
        <div>
          <ul className="flex gap-5 md:gap-10">
            {footerLinks.map((link) => (
              <li
                key={link.name}
                className="flex items-center text-base font-medium leading-5 transition-all duration-300 font-title text-secondary hover:scale-125"
              >
                <a
                  href={link.url}
                  target="_blank"
                  className="flex items-center text-xl"
                >
                  <span
                    className="inline-block w-5 h-5 mr-2"
                    style={{
                      backgroundImage: `url(${link.imageUrl})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <span className="hidden sm:inline">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
