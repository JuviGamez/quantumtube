import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../theme';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: auto;

  .stardust,
  .cosmic-ring,
  .starfield,
  .nebula {
    max-height: 60px;
    max-width: 300px;
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: hidden;
    z-index: -1;
    border-radius: 12px;
    filter: blur(3px);
    right: 0;
  }

  .input {
    background-color: #05071b;
    border: none;
    width: 280px;
    height: 45px;
    border-radius: 10px;
    color: ${theme.colors.text};
    padding-inline: 50px;
    font-size: 16px;
  }

  #search-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transform: scale(0.95);
    transform-origin: right center;
  }

  .input::placeholder {
    color: ${theme.colors.textSecondary};
  }

  .input:focus {
    outline: none;
  }

  #main:focus-within > #input-mask {
    display: none;
  }

  #input-mask {
    pointer-events: none;
    width: 100px;
    height: 20px;
    position: absolute;
    background: linear-gradient(90deg, transparent, #05071b);
    top: 18px;
    left: 70px;
  }

  #cosmic-glow {
    pointer-events: none;
    width: 30px;
    height: 20px;
    position: absolute;
    background: ${theme.colors.primary};
    top: 10px;
    left: 5px;
    filter: blur(20px);
    opacity: 0.8;
    transition: all 2s;
  }

  #main:hover > #cosmic-glow {
    opacity: 0;
  }

  .stardust {
    max-height: 63px;
    max-width: 307px;
    border-radius: 10px;
    filter: blur(2px);
  }

  .stardust::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(83deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.4);
    background-image: conic-gradient(
      rgba(0, 0, 0, 0) 0%,
      ${theme.colors.primary},
      rgba(0, 0, 0, 0) 8%,
      rgba(0, 0, 0, 0) 50%,
      ${theme.colors.secondary},
      rgba(0, 0, 0, 0) 58%
    );
    transition: all 2s;
  }

  .cosmic-ring {
    max-height: 59px;
    max-width: 303px;
    border-radius: 11px;
    filter: blur(0.5px);
  }

  .cosmic-ring::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(70deg);
    position: absolute;
    width: 600px;
    height: 600px;
    filter: brightness(1.3);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      #05071b,
      ${theme.colors.primary} 5%,
      #05071b 14%,
      #05071b 50%,
      ${theme.colors.secondary} 60%,
      #05071b 64%
    );
    transition: all 2s;
  }

  .starfield {
    max-height: 65px;
    max-width: 312px;
  }

  .starfield::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(82deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      rgba(0, 0, 0, 0),
      #1c2452,
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 0) 50%,
      #2a3875,
      rgba(0, 0, 0, 0) 60%
    );
    transition: all 2s;
  }

  #search-container:hover > .starfield::before {
    transform: translate(-50%, -50%) rotate(-98deg);
  }

  #search-container:hover > .nebula::before {
    transform: translate(-50%, -50%) rotate(-120deg);
  }

  #search-container:hover > .stardust::before {
    transform: translate(-50%, -50%) rotate(-97deg);
  }

  #search-container:hover > .cosmic-ring::before {
    transform: translate(-50%, -50%) rotate(-110deg);
  }

  #search-container:focus-within > .starfield::before {
    transform: translate(-50%, -50%) rotate(442deg);
    transition: all 4s;
  }

  #search-container:focus-within > .nebula::before {
    transform: translate(-50%, -50%) rotate(420deg);
    transition: all 4s;
  }

  #search-container:focus-within > .stardust::before {
    transform: translate(-50%, -50%) rotate(443deg);
    transition: all 4s;
  }

  #search-container:focus-within > .cosmic-ring::before {
    transform: translate(-50%, -50%) rotate(430deg);
    transition: all 4s;
  }

  .nebula {
    overflow: hidden;
    filter: blur(30px);
    opacity: 0.4;
    max-height: 130px;
    max-width: 354px;
  }

  .nebula:before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(60deg);
    position: absolute;
    width: 999px;
    height: 999px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      #000,
      ${theme.colors.primary} 5%,
      #000 38%,
      #000 50%,
      ${theme.colors.secondary} 60%,
      #000 87%
    );
    transition: all 2s;
  }

  #wormhole-icon {
    position: absolute;
    top: 6px;
    right: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    max-height: 34px;
    max-width: 34px;
    height: 100%;
    width: 100%;
    isolation: isolate;
    overflow: hidden;
    border-radius: 10px;
    background: linear-gradient(180deg, #1c2452, #05071b, #2a3875);
    border: 1px solid transparent;
  }

  .wormhole-border {
    height: 36px;
    width: 36px;
    position: absolute;
    overflow: hidden;
    top: 5px;
    right: 5px;
    border-radius: 10px;
  }

  .wormhole-border::before {
    content: "";
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.35);
    background-image: conic-gradient(
      rgba(0, 0, 0, 0),
      ${theme.colors.primary},
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0) 50%,
      ${theme.colors.secondary},
      rgba(0, 0, 0, 0) 100%
    );
    animation: rotate 4s linear infinite;
  }

  #main {
    position: relative;
    margin-left: auto;
  }

  #search-icon {
    position: absolute;
    left: 16px;
    top: 12px;
  }

  @keyframes rotate {
    100% {
      transform: translate(-50%, -50%) rotate(450deg);
    }
  }
`;

const CosmicSearch = ({ value, onChange, onFocus, onBlur, onSubmit }) => {
  return (
    <StyledWrapper>
      <div id="search-container">
        <div className="nebula" />
        <div className="starfield" />
        <div className="cosmic-dust" />
        <div className="cosmic-dust" />
        <div className="cosmic-dust" />
        <div className="stardust" />
        <div className="cosmic-ring" />
        <div id="main">
          <form onSubmit={onSubmit}>
            <input
              className="input"
              name="text"
              type="text"
              placeholder="Search..."
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </form>
          <div id="input-mask" />
          <div id="cosmic-glow" />
          <div className="wormhole-border" />
          <div id="wormhole-icon">
            <svg
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth={2}
              stroke={theme.colors.text}
              fill="none"
              height={24}
              width={24}
              viewBox="0 0 24 24"
            >
              <circle r={10} cy={12} cx={12} />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <div id="search-icon">
            <svg
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth={2}
              stroke="url(#cosmic-search)"
              fill="none"
              height={24}
              width={24}
              viewBox="0 0 24 24"
            >
              <circle r={8} cy={11} cx={11} />
              <line y2="16.65" x2="16.65" y1={21} x1={21} />
              <defs>
                <linearGradient gradientTransform="rotate(45)" id="cosmic-search">
                  <stop stopColor={theme.colors.text} offset="0%" />
                  <stop stopColor={theme.colors.textSecondary} offset="100%" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default CosmicSearch; 