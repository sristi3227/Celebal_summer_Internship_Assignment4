// localStorage.js - Utility functions for playlist storage

const PLAYLIST_STORAGE_KEY = 'music_playlists';

/**
 * Save playlists to localStorage
 * @param {Array} playlists - Array of playlist objects
 */
export const savePlaylistsToStorage = (playlists) => {
  try {
    const playlistData = {
      playlists: playlists,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(PLAYLIST_STORAGE_KEY, JSON.stringify(playlistData));
    
    // Also trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('playlistsUpdated', { detail: playlists }));
    
    return true;
  } catch (error) {
    console.error('Error saving playlists to localStorage:', error);
    return false;
  }
};

/**
 * Load playlists from localStorage
 * @returns {Array} Array of playlist objects
 */
export const loadPlaylistsFromStorage = () => {
  try {
    const storedData = localStorage.getItem(PLAYLIST_STORAGE_KEY);
    if (!storedData) {
      return [];
    }
    
    const parsedData = JSON.parse(storedData);
    return parsedData.playlists || [];
  } catch (error) {
    console.error('Error loading playlists from localStorage:', error);
    return [];
  }
};

/**
 * Initialize playlists from memory (window.playlistData) if localStorage is empty
 * This helps with migration from the old system
 */
export const initializeFromMemory = () => {
  try {
    const storedPlaylists = loadPlaylistsFromStorage();
    
    // If localStorage is empty but we have data in memory, migrate it
    if (storedPlaylists.length === 0 && window.playlistData && window.playlistData.length > 0) {
      console.log('Migrating playlists from memory to localStorage');
      savePlaylistsToStorage(window.playlistData);
      return window.playlistData;
    }
    
    return storedPlaylists;
  } catch (error) {
    console.error('Error initializing playlists:', error);
    return [];
  }
};

/**
 * Clear all playlists from localStorage
 */
export const clearPlaylistStorage = () => {
  try {
    localStorage.removeItem(PLAYLIST_STORAGE_KEY);
    window.playlistData = [];
    window.dispatchEvent(new CustomEvent('playlistsUpdated', { detail: [] }));
    return true;
  } catch (error) {
    console.error('Error clearing playlist storage:', error);
    return false;
  }
};

/**
 * Get storage info (size, last updated)
 * @returns {Object} Storage information
 */
export const getStorageInfo = () => {
  try {
    const storedData = localStorage.getItem(PLAYLIST_STORAGE_KEY);
    if (!storedData) {
      return {
        exists: false,
        size: 0,
        lastUpdated: null,
        playlistCount: 0
      };
    }
    
    const parsedData = JSON.parse(storedData);
    return {
      exists: true,
      size: new Blob([storedData]).size,
      lastUpdated: parsedData.lastUpdated,
      playlistCount: parsedData.playlists ? parsedData.playlists.length : 0
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return {
      exists: false,
      size: 0,
      lastUpdated: null,
      playlistCount: 0
    };
  }
};

/**
 * Export playlists as JSON file
 * @param {Array} playlists - Array of playlist objects
 */
export const exportPlaylistsAsJSON = (playlists) => {
  try {
    const dataStr = JSON.stringify(playlists, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `playlists_export_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    return true;
  } catch (error) {
    console.error('Error exporting playlists:', error);
    return false;
  }
};

/**
 * Import playlists from JSON file
 * @param {File} file - JSON file containing playlists
 * @returns {Promise<Array>} Promise resolving to array of playlists
 */
export const importPlaylistsFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const playlists = JSON.parse(e.target.result);
        
        // Validate the imported data
        if (!Array.isArray(playlists)) {
          throw new Error('Invalid playlist format: expected array');
        }
        
        // Basic validation for playlist structure
        const validPlaylists = playlists.filter(playlist => 
          playlist && 
          typeof playlist === 'object' && 
          playlist.name && 
          Array.isArray(playlist.songs)
        );
        
        resolve(validPlaylists);
      } catch (error) {
        reject(new Error('Invalid JSON file or playlist format'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Merge imported playlists with existing ones
 * @param {Array} existingPlaylists - Current playlists
 * @param {Array} importedPlaylists - Playlists to import
 * @param {boolean} replaceExisting - Whether to replace existing playlists with same name
 * @returns {Array} Merged playlists
 */
export const mergePlaylistsFromImport = (existingPlaylists, importedPlaylists, replaceExisting = false) => {
  const merged = [...existingPlaylists];
  
  importedPlaylists.forEach(importedPlaylist => {
    // Ensure the imported playlist has a unique ID
    importedPlaylist.id = importedPlaylist.id || Date.now() + Math.random();
    
    const existingIndex = merged.findIndex(p => p.name === importedPlaylist.name);
    
    if (existingIndex !== -1) {
      if (replaceExisting) {
        merged[existingIndex] = importedPlaylist;
      } else {
        // Rename the imported playlist to avoid conflicts
        let suffix = 1;
        let newName = `${importedPlaylist.name} (${suffix})`;
        
        while (merged.some(p => p.name === newName)) {
          suffix++;
          newName = `${importedPlaylist.name} (${suffix})`;
        }
        
        importedPlaylist.name = newName;
        merged.push(importedPlaylist);
      }
    } else {
      merged.push(importedPlaylist);
    }
  });
  
  return merged;
};

/**
 * Check if localStorage is available
 * @returns {boolean} Whether localStorage is available
 */
export const isStorageAvailable = () => {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Sync playlists between localStorage and memory
 * This ensures both storage methods stay in sync
 */
export const syncPlaylistStorage = () => {
  try {
    const localStoragePlaylists = loadPlaylistsFromStorage();
    const memoryPlaylists = window.playlistData || [];
    
    // If localStorage has more recent data, use that
    if (localStoragePlaylists.length > memoryPlaylists.length) {
      window.playlistData = localStoragePlaylists;
      return localStoragePlaylists;
    }
    
    // If memory has more recent data, save to localStorage
    if (memoryPlaylists.length > localStoragePlaylists.length) {
      savePlaylistsToStorage(memoryPlaylists);
      return memoryPlaylists;
    }
    
    // If equal, return localStorage data as source of truth
    return localStoragePlaylists;
  } catch (error) {
    console.error('Error syncing playlist storage:', error);
    return [];
  }
};