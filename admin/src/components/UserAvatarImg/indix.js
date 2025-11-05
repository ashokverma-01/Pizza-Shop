const UserAvatarImg = ({ src, size = 40, alt = "User" }) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f4f4",
        border: "2px solid #e0e0e0",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: "50%",
          display: "block",
        }}
      />
    </div>
  );
};

export default UserAvatarImg;
