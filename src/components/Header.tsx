import React from 'react';
import { Container, Group, Text, Box } from '@mantine/core';
import styles from './Header.module.css';

interface HeaderProps {
  activeTab?: 'vacancies' | 'about';
  onTabChange?: (tab: 'vacancies' | 'about') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab = 'vacancies',
  onTabChange,
}) => {
  return (
    <Box component="header" className={styles.header}>
      <Container size="xl" className={styles.container}>
        <Group
          justify="space-between"
          align="center"
          className={styles.innerGroup}
        >
          <Group gap="xs" align="center">
            <Box className={styles.logoBadge}>hh</Box>
            <Text className={styles.logoText}>.FrontEnd</Text>
          </Group>

          <Box className={styles.navigation}>
            <div
              className={styles.navLink}
              onClick={() => onTabChange?.('vacancies')}
              role="button"
              tabIndex={0}
            >
              <Text
                className={
                  activeTab === 'vacancies'
                    ? styles.navTextActive
                    : styles.navText
                }
              >
                Вакансии FE
              </Text>
              {activeTab === 'vacancies' && <span className={styles.dot} />}
            </div>

            <div
              className={styles.navLink}
              onClick={() => onTabChange?.('about')}
              role="button"
              tabIndex={0}
            >
              <span className={styles.userIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <Text
                className={
                  activeTab === 'about' ? styles.navTextActive : styles.navText
                }
              >
                Обо мне
              </Text>
              {activeTab === 'about' && <span className={styles.dot} />}
            </div>
          </Box>
        </Group>
      </Container>
    </Box>
  );
};
