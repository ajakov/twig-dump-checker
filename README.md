# Var Dump Checker GitHub action

This action checks for accidental remaining dump calls in your twig files. 

## Inputs

## `source-dir`

**Required** Tha path to directory where your source files are located

## Outputs

## `time`

The time when the check is completed.

## Example usage

uses: ajakov/twig-dump-checker@v1.1
with:
source-dir: './src'