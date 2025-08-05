// Copyright (c) Kaustav Ray

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);          </button>
        </form>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<ChatBot />);
