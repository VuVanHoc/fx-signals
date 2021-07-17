import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "../../assets/logo.svg";
import cx from "classnames";
import { MENU_NAVBAR } from "../../Constant";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const router = useRouter();
  const menu = useMemo(() => MENU_NAVBAR, []);
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {menu.map((item, index) => (
          <div key={index} className="flex">
            {router.asPath === item.href && <Image src={Logo} alt="Logo" />}
            <li>
              <Link href={item.href}>
                <a
                  className={cx({
                    [styles.activeLink]: router.asPath === item.href,
                    [styles.a]: true,
                  })}
                >
                  {item.title}
                </a>
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </nav>
  );
}
