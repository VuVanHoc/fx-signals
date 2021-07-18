import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "../../assets/logo.svg";
import cx from "classnames";
import { MENU_NAVBAR } from "../../Constant";
import styles from "./NavBar.module.css";
import Drawer from "@material-ui/core/Drawer";
import { useState, useCallback } from "react";
import MenuIcon from "../../assets/icons/Menu.svg";
import { makeStyles } from "@material-ui/core";
export default function NavBar() {
  const router = useRouter();
  const menu = useMemo(() => MENU_NAVBAR, []);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = useCallback(() => {
    setOpenDrawer((o) => !o);
  }, [setOpenDrawer]);
  const useStyles = makeStyles({
    paper: {
      background: "#313131",
    },
  });
  const classes = useStyles();

  return (
    <>
      {/* Display icon drawer for mobile & Tablet */}
      <div className={styles.iconDrawer}>
        <Image src={MenuIcon} alt="iconMenu" onClick={toggleDrawer} />
        <Drawer
          classes={{ paper: classes.paper }}
          anchor="left"
          open={openDrawer}
          onClose={toggleDrawer}
          PaperProps={{ square: false }}
          ModalProps={{}}
        >
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
        </Drawer>
      </div>

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
    </>
  );
}
