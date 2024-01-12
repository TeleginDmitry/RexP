import { useState, useEffect } from "react";

import clsx from "clsx";
import { useRouter } from "next/router";

import Basket from "@/public/images/icons/basket.svg";
import Favourites from "@/public/images/icons/favourites.svg";
import Home from "@/public/images/icons/home.svg";
import Profile from "@/public/images/icons/profile.svg";
import DefaultLink from "@/src/components/ui/links/DefaultLink";
import RootText from "@/src/components/ui/RootText";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";

import type { MenuItemType } from "./types";

import s from "./Footer.module.scss";

const MENU_ITEMS: MenuItemType[] = [
  { text: "Главная", href: "/", icon: <Home /> },
  { text: "Корзина", href: "/basket", icon: <Basket /> },
  { text: "Избранное", href: "/favourites", icon: <Favourites /> },
  { text: "Профиль", href: "/profile", icon: <Profile /> },
];

const Footer = () => {
  const carts = useAppSelector((state) => state.carts.data);
  const router = useRouter();
  const [pathname, setPathname] = useState(router.asPath);

  useEffect(() => {
    setPathname(router.asPath);
  }, [router]);

  return (
    <footer className={s.footer}>
      <ul className={s.menu}>
        {MENU_ITEMS.map(({ text, href, icon }) => (
          <li
            key={text}
            className={clsx(s.item, (href === "/" ? pathname === href : pathname.includes(href)) && s.active)}
          >
            <DefaultLink href={href} className={s.link}>
              {text === "Корзина" && !!carts.length && <span className={s.count}>{carts.length}</span>}
              {icon}
              <RootText variant="11px" color="grey" className={s.text}>
                {text}
              </RootText>
            </DefaultLink>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
