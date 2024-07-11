import React, { useState, useEffect } from 'react';
import {
	Dialog,
	DialogContent,
	ThemeProvider,
	createTheme,
} from '@mui/material';


const theme = createTheme({
	palette: {
		primary: {
			main: '#000000', // set primary color to black
		},
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: '#000000', // black border when focused
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					'&.Mui-focused': {
						color: '#000000', // black label when focused
					},
				},
			},
		},
	},
});

const Modal = ({ isOpen, onClose, children }) => {
	return (
		<ThemeProvider theme={theme}>
			<Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
				<DialogContent>
          { children }
				</DialogContent>
			</Dialog>
		</ThemeProvider>
	);
};

export default Modal;
