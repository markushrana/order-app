"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  comment?: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
};

const menu: MenuItem[] = [
  {
    id: "momo",
    name: "モモ",
    price: 180,
    comment: "肉や野菜が入った蒸し餃子。",
    image: { url: "/momo.jpg", width: 259, height: 194 },
  },
  {
    id: "yomari",
    name: "ヨマリ",
    price: 130,
    comment: "ゴマと黒糖入りの甘い蒸し餃子。",
    image: { url: "/yomari.jpg", width: 259, height: 194 },
  },
  {
    id: "sausage",
    name: "ソーセージ",
    price: 159,
    comment: "ソース付きのグリルソーセージ。",
    image: { url: "/sausage.jpg", width: 201, height: 251 },
  },
  {
    id: "panipuri",
    name: "パニプリ",
    price: 100,
    comment: "スパイシーな水とポテトが入った空洞のプーリ。",
    image: { url: "/panipuri.jpg", width: 275, height: 183 },
  },
  {
    id: "samosa",
    name: "サモサ",
    price: 100,
    comment: "スパイスの効いたポテト入りのサクサクパイ。",
    image: { url: "/samosa.jpg", width: 247, height: 204 },
  },
  {
    id: "selroti",
    name: "セルロティ",
    price: 100,
    comment: "ネパールの伝統的な米粉ドーナツ。",
    image: { url: "/selroti.jpg", width: 259, height: 194 },
  },
  {
    id: "chatpat",
    name: "チャトパット",
    price: 90,
    comment: "スパイシーで酸味のあるストリートスナック。",
    image: { url: "/chatpat.jpg", width: 258, height: 195 },
  },
  {
    id: "papdichat",
    name: "パパディチャット",
    price: 90,
    comment: "パリパリのパパドとスパイシーな具材。",
    image: { url: "/Papdichat.jpg", width: 259, height: 194 },
  },
];

export default function MenuPage() {
  const [cart, setCart] = useState<{ item: MenuItem; qty: number }[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  // Add item to cart or increase quantity
  const handleAdd = (item: MenuItem, qty: number = 1) => {
    setCart((prev) => {
      const found = prev.find((c) => c.item.id === item.id);
      if (found) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, qty: c.qty + qty } : c
        );
      } else {
        return [...prev, { item, qty }];
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
          background: "linear-gradient(90deg, #23272f 60%, #2d3140 100%)",
          padding: "2.2rem 0 1.2rem 0",
          textAlign: "center",
          fontSize: "2.7rem",
          fontWeight: "bold",
          letterSpacing: "0.12em",
          fontFamily: "Arial Black, Arial, sans-serif",
          boxShadow: "0 2px 24px #fbbf2490",
          marginBottom: "2.5rem",
          borderBottom: "4px solid #fbbf24",
        }}
      >
        <span
          style={{
            background: "linear-gradient(90deg, #ffe066 30%, #fbbf24 70%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 16px #fbbf24, 0 2px 8px #23272f80",
            fontSize: "3.1rem",
            letterSpacing: "0.13em",
            padding: "0 0.2em",
            display: "inline-block",
          }}
        >
           NEP LOCAL HOUSE
        </span>
        <div
          style={{
            fontSize: "1.2rem",
            color: "#ffe066",
            marginTop: 8,
            letterSpacing: "0.08em",
            textShadow: "0 0 8px #fbbf24, 0 1px 4px #23272f80",
          }}
        >
          ネパロかるハウス
        </div>
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
              style={{ marginTop: 16, background: "#dc2626", color: "#fff" }}
              onClick={() => {
                handleCancel();
                handleCloseCheckout();
              }}
            >
              キャンセル
            </button>
            <button
              className={styles.addButton}
              style={{ marginTop: 16, background: "#fbbf24", color: "#b91c1c" }}
              onClick={handleCloseCheckout}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
      <footer
        style={{
          width: "100%",
          background: "#111",
          color: "#fff",
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
