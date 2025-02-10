import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AvatarSelector from "../AvatarSelector";

describe("AvatarSelector Component", () => {
  const avatars = ["/images/1.png", "/images/2.png", "/images/3.png"];
  let selectedAvatar = avatars[0];
  const setSelectedAvatar = jest.fn((avatar) => (selectedAvatar = avatar));

  it("Should render correctly", () => {
    render(
      <AvatarSelector
        avatars={avatars}
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
      />
    );

    expect(screen.getByText("Choose your avatar")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(avatars.length);
  });

  it("Should display all avatars", () => {
    render(
      <AvatarSelector
        avatars={avatars}
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
      />
    );
  
    const images = screen.getAllByAltText("User Avatar");
  
    avatars.forEach((avatar, index) => {
      expect(images[index]).toBeInTheDocument();
      expect(images[index]).toHaveAttribute("src", avatar);
    });
  });  

  it("Should call setSelectedAvatar when clicking on an avatar", () => {
    render(
      <AvatarSelector
        avatars={avatars}
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
      />
    );
  
    const avatarButtons = screen.getAllByRole("button");
    fireEvent.click(avatarButtons[1]);
  
    expect(setSelectedAvatar).toHaveBeenCalledWith(avatars[1]);
  });  

  it("Should apply correct styles to the selected avatar", () => {
    render(
      <AvatarSelector
        avatars={avatars}
        selectedAvatar={avatars[1]}
        setSelectedAvatar={setSelectedAvatar}
      />
    );
  
    const avatarButtons = screen.getAllByRole("button");
    expect(avatarButtons[1]).toHaveClass("border-[#7D00FF] scale-110 shadow-lg");
  });  

  it("Should apply hover effect to unselected avatars", () => {
    render(
      <AvatarSelector
        avatars={avatars}
        selectedAvatar={avatars[1]}
        setSelectedAvatar={setSelectedAvatar}
      />
    );
  
    const avatarButtons = screen.getAllByRole("button");
    expect(avatarButtons[0]).toHaveClass("border-transparent hover:scale-105 opacity-80 hover:opacity-100");
  });  
});
