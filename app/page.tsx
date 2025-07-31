"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  comment?: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
};

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<{ item: MenuItem; qty: number }[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  // Fetch menu from microCMS
  useEffect(() => {
    const apiKey =
      process.env.NEXT_PUBLIC_MICROCMS_API_KEY || process.env.MICROCMS_API_KEY;
    const serviceDomain =
      process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN ||
      process.env.MICROCMS_SERVICE_DOMAIN;
    if (!apiKey || !serviceDomain) return;
    fetch(`https://${serviceDomain}.microcms.io/api/v1/menu`, {
      headers: { "X-API-KEY": apiKey },
    })
      .then((res) => res.json())
      .then((data) => setMenu(data.contents || []));
  }, []);

  // Add item to cart or increase quantity
  const handleAdd = (item: MenuItem) => {
    setCart((prev) => {
      const found = prev.find((c) => c.item.id === item.id);
      if (found) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c
        );
      } else {
        return [...prev, { item, qty: 1 }];
      }
    });
  };

  // Remove one quantity or remove item
  const handleRemove = (itemId: string) => {
    setCart((prev) => {
      const found = prev.find((c) => c.item.id === itemId);
      if (found && found.qty > 1) {
        return prev.map((c) =>
          c.item.id === itemId ? { ...c, qty: c.qty - 1 } : c
        );
      } else {
        return prev.filter((c) => c.item.id !== itemId);
      }
    });
  };

  // Remove all items from cart
  const handleCancel = () => setCart([]);

  // Open checkout modal
  const handleCheckout = () => setShowCheckout(true);
  // Close checkout modal
  const handleCloseCheckout = () => setShowCheckout(false);

  // Calculate total
  const total = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0);

  return (
    <div className={styles["mcd-bg"]}>
      <header
        style={{
          width: "100%",
          background: "#b91c1c",
          color: "#fff",
          padding: "1.5rem 0",
          textAlign: "center",
          fontSize: "2.2rem",
          fontWeight: "bold",
          letterSpacing: "0.08em",
          fontFamily: "Arial Black, Arial, sans-serif",
          boxShadow: "0 2px 8px #fbbf24a0",
          marginBottom: "2rem",
        }}
      >
        サウニ コ バッティ
      </header>
      <div className={styles.container}>
        {/* メニューリスト */}
        <main className={styles.menuList}>
          <h1 className={styles.title}>メニュー</h1>
          <ul className={styles.list}>
            {menu.map((item) => (
              <li key={item.id} className={styles.item}>
                {item.image && (
                  <Image
                    src={item.image.url}
                    alt={item.name}
                    width={item.image.width}
                    height={item.image.height}
                    className={styles.menuImage}
                  />
                )}
                <p className={styles.name}>{item.name}</p>
                <p
                  style={{
                    fontWeight: "bold",
                    margin: "0.3em 0 0.7em 0",
                    color: "#b91c1c",
                    fontSize: "1.1em",
                  }}
                >
                  {item.price}円
                </p>
                <button
                  className={styles.addButton}
                  onClick={() => handleAdd(item)}
                >
                  カートに追加
                </button>
                {item.comment && (
                  <p className={styles.comment}>{item.comment}</p>
                )}
                <hr className={styles.separator} />
              </li>
            ))}
          </ul>
        </main>

        {/* カートサイドバー */}
        <aside className={styles.cart}>
          <h2 className={styles.cartTitle}>カート</h2>
          {cart.length === 0 ? (
            <p className={styles.empty}>カートは空です。</p>
          ) : (
            <>
              <ul style={{ padding: 0, listStyle: "none" }}>
                {cart.map((c) => (
                  <li key={c.item.id} className={styles.cartItem}>
                    {c.item.image && (
                      <Image
                        src={c.item.image.url}
                        alt={c.item.name}
                        width={60}
                        height={40}
                        className={styles.cartImage}
                      />
                    )}
                    <p className={styles.cartName}>
                      {c.item.name} — {c.item.price}円 × {c.qty}
                    </p>
                    <button
                      className={styles.addButton}
                      style={{
                        marginLeft: 8,
                        background: "#fbbf24",
                        color: "#b91c1c",
                      }}
                      onClick={() => handleAdd(c.item)}
                    >
                      ＋
                    </button>
                    <button
                      className={styles.addButton}
                      style={{
                        marginLeft: 4,
                        background: "#fbbf24",
                        color: "#b91c1c",
                      }}
                      onClick={() => handleRemove(c.item.id)}
                    >
                      －
                    </button>
                  </li>
                ))}
                <li
                  style={{
                    marginTop: "1.5rem",
                    fontWeight: "bold",
                    color: "#b91c1c",
                    fontSize: "1.1rem",
                  }}
                >
                  合計: {total}円
                </li>
              </ul>
              <button
                className={styles.addButton}
                style={{ marginTop: 16, background: "#dc2626", color: "#fff" }}
                onClick={handleCancel}
              >
                カートをクリア
              </button>
              <button
                className={styles.addButton}
                style={{ marginTop: 16, background: "#22c55e", color: "#fff" }}
                onClick={handleCheckout}
              >
                注文する
              </button>
            </>
          )}
        </aside>
      </div>
      {/* チェックアウトモーダル */}
      {showCheckout && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 16,
              minWidth: 320,
            }}
          >
            <h2>ご注文内容</h2>
            <p>ご注文ありがとうございます！</p>
            <p style={{ fontWeight: "bold", marginTop: 16 }}>合計: {total}円</p>
            <button
              className={styles.addButton}
              style={{ marginTop: 24, background: "#fbbf24", color: "#b91c1c" }}
              onClick={() => {
                handleCancel();
                handleCloseCheckout();
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
      <footer
        style={{
          width: "100%",
          background: "#fbbf24",
          color: "#b91c1c",
          padding: "1rem 0",
          textAlign: "center",
          fontSize: "1.1rem",
          fontWeight: "bold",
          letterSpacing: "0.04em",
          fontFamily: "Arial, sans-serif",
          marginTop: "2rem",
        }}
      >
        © {new Date().getFullYear()} Sauni Ko Bhatti | All rights reserved.
      </footer>
    </div>
  );
}
