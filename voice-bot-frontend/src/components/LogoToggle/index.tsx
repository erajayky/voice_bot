"use client"

import { useState, useEffect } from 'react';
import { useLocalstorageState } from 'rooks';

const LogoToggle = () => {
    const [logoSrc, setLogoSrc] = useState("/logos/logoblack.svg"); // use "/logo.svg"
    const [theme] = useLocalstorageState("theme", "system");

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const updateLogo = () => {
            if (theme === 'dark') {
                setLogoSrc("/logos/logowhite.svg");
            } else if (theme === 'light') {
                setLogoSrc("/logos/logoblack.svg");
            } else if (theme === 'system') {
                setLogoSrc(mediaQuery.matches ? "/logos/logowhite.svg" : "/logos/logoblack.svg");
            }
        };

        updateLogo();
        mediaQuery.addEventListener('change', updateLogo);

        return () => {
            mediaQuery.removeEventListener('change', updateLogo);
        };
    }, [theme]);

    return logoSrc;
};

export default LogoToggle;
