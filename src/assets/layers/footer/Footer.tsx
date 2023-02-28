//React Router
import { Link } from 'react-router-dom';
//React Icons
import { AiFillGithub } from 'react-icons/ai';
import { CiLinkedin } from 'react-icons/ci';
const Footer = () => {
  return (
    <footer className="bg-slate-700 flex flex-col text-center mt-10 gap-5 pt-2.5 pb-2.5 2xl:rounded-t-xl ">
      <p className="text-3xl ">MovieFlix</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero,
        voluptatem! Fuga soluta aspernatur iusto incidunt dolore in id eaque
        pariatur sit sunt quis magnam, nam explicabo, sed ea voluptatibus neque.
      </p>
      <p>Coded by:</p>
      <p>Jakub Mielewczyk</p>
      <div className="flex justify-center gap-5">
        <Link to="https://www.linkedin.com/in/jakub-mielewczyk-b411a6221/">
          <CiLinkedin className="text-5xl" />
        </Link>
        <Link to="https://github.com/JMielewczyk">
          <AiFillGithub className="text-5xl" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
