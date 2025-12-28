# Pseudo Pin

A simple Obsidian plugin for temporarily unpinning and repinning pinned tabs / files. See [Why the plugin exists](#why-it-exists).

## Preview

![Preview Gif](./docs/preview.gif)

## What it does

When the focused file is pinned and you trigger the **Pseudo Pin** command:

1. The file is temporarily unpinned  
2. Your chosen **opening method** (ex. Quick Switcher, Omnisearch, etc.) is launched  
3. The newly opened file is repinned  


## Setup

1. Choose an opening method in the settings (default is Quick Switcher)
2. Assign a keybind to the appropriate Pseudo Pin command.This can be the same keybind you normally use to launch your preferred opening method.

## Why it exists

Pseudo Pin facilitates the ["Two-pane navigation"](#two-pane--split-screen-navigation) workflow. Its purpose is to make changing **navigational notes** as easy as possible.

Although manually pinning and unpinning is already easy, using the plugin comes at virtually no cost because it is lightweight and there is no need to learn new keybinds.

## Two-pane / split-screen navigation

This navigation method relies on:

- One file / tab remaining pinned
- Obsidian’s behavior of opening internal links from a pinned file in another active file

The pinned file acts as a **navigational note**, which can take many forms:

- Notes  
- MOCs (Maps of Contents)  
- Base views  
- Graph views  

The other active (visible) non-pinned file acts as a **content note** that displays the opened internal link.

Visual explanations:

- [Example #1](https://www.youtube.com/watch?v=5Y7E49SJecM)
