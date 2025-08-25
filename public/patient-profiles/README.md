# Patient Profile Pictures

This directory contains profile pictures for patients in the dental simulation system.

## Naming Convention

Patient profile pictures should be named using the patient ID in lowercase, followed by `.png` or `.jpg`:

- For patient ID "EB-0001", name the file: `eb-0001.png` or `eb-0001.jpg`
- For patient ID "DT-0002", name the file: `dt-0002.png` or `dt-0002.jpg`

## Image Requirements

- **Format**: PNG or JPG
- **Size**: Recommended 200x200 pixels or larger (square aspect ratio)
- **File Size**: Keep under 500KB for optimal loading

## Current Patients

Based on the mock data:
- **EB Plumeri (EB-0001)**: `eb-0001.png` - Dental professional with veneer follow-up
- **Donald Trump (DT-0002)**: `dt-0002.png` - High-profile patient with crown replacement
- **Henry Kissinger (HK-0003)**: `hk-0003.png` - Senior patient with denture maintenance  
- **Cosmo Kramer (KR-0004)**: `kr-0004.png` - Eccentric patient with emergency bonding repair

## Usage

The patient system supports:
- Multiple patient profiles with comprehensive mock data
- Patient selection via URL parameters: `/?patient=EB-0001`
- Individual patient simulations with realistic medical histories
- Navigation via `/people` page to browse all patients

## Fallback

If no profile picture is found, the system will display the patient's initials in a circular avatar as a fallback.
