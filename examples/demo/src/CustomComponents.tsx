// Export all custom components for markdown injection
import Alert from './components/Alert';
import Badge from './components/Badge';
import Card from './components/Card';
import Button from './components/Button';
import Collapsible from './components/Collapsible';
import ProgressBar from './components/ProgressBar';
import Counter from './components/Counter';
import Tabs, { Tab } from './components/Tabs';
import Highlight from './components/Highlight';
import YoutubeVideo from './components/YoutubeVideo';

// Export individual components
export { Alert, Badge, Card, Button, Collapsible, ProgressBar, Counter, Tabs, Tab, Highlight, YoutubeVideo };

// Export all components as a single object for easy injection
export const customComponents = {
    Alert,
    Badge,
    Card,
    Button,
    Collapsible,
    ProgressBar,
    Counter,
    Tabs,
    Tab,
    Highlight,
    YoutubeVideo,
};

