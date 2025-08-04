---
title: Research
date: 2025-07-31 13:35:22
---
_Last updated: 2025-07-31_

**Basically this is what I do**  
It's hard to build a quantum computer - qubits rarely do what you want them to do.   
Qubits constantly interact with things you didn't invite - other qubits, your control hardware, environmental noise, your negative vibe, etc. You might think that with better engineering we could eliminate all noise and interactions, but there's a paradox: 

*A perfectly noiseless qubit must be perfectly isolated. But a perfectly isolated qubit is also isolated from you.*

That's where my work comes in. In the tech stack of quantum computing, my work lives somewhere between quantum software (algorithms) and quantum hardware (chip fabrication). Think of it as the *firmware layer*: I study how to control qubits, make them do the right thing, even when everything else tries to mess it up. 

**Reverse Engineering Schrodinger's Equation**      
I don't really know how to solve Schrodinger equation, $dU(t) = -i H(t) U(t) dt$, especially when $H(t)$ doesn't commute with itself at different times - which is almost always true if you are actively controlling the qubit. So I do it reversely: write down evolution operator $U(t)$ first, then reconstruct the Hamiltonian:   

$$H(t)\,dt = i\, dU(t)\, U^\dagger(t)$$   

This gives us explicit control protocols with guaranteed behavior — even in non-ideal environments. It's a trick I love and am still working on developing new control protocols based on it. 

**Canceling Errors Dynamically**  
Real Hamiltonians look like $H(t) = H_0(t) + V(t)$, where $V(t)$ is the unwanted couplings — crosstalk, noise, etc. I design $H_0(t)$ so that the net effect of $V(t)$ cancels itself out. In the interaction frame defined by $U_0(t)$, it becomes $\tilde{V}(t) = U_0^\dagger(t) V(t) U_0(t)$.  
We then engineer things so that the accumulated evolution under this interaction Hamiltonian returns to identity: 

$$\tilde{U}(T) = \mathcal{T} \exp\left(-i \int_0^T \tilde{V}(t) dt \right) = I$$    

Meanwhile, the desired evolution $U_0(T)$ should still implement a logical gate like a $\pi$-rotation or something.  
Roughly, this is how I approach qubit control with unwanted stuff in it.

**Space-Curve Quantum Control**  
Geometry is beautiful, that's how I see things. Here the erroneus evolution, $\tilde{U}(t)$, traces a **geometric curve**, if we write it this way:  

$$\tilde{U}(t) = \exp(-i\, \vec{R}(t) \cdot \vec{\sigma})$$  

$\vec{R}(t)$ is the curve, and the dynamics of the qubit system is actually encoded in it.

This idea leads to the **Space-Curve Quantum Control (SCQC)** framework: control protocols are interpreted as curves in geometric space. For weak $V(t)$, this is a Euclidean space; for strong coupling, it becomes a curved manifold.  
Specifically, for single qubit, or SU(2) generally, the curvature and torsion of these curves relate to control fields. It's pretty fancy if you think about it: you can literally draw a curve, I mean with your hand, and then read off the curvature and torsion of this curve - you get a qubit dynamics, with known error profile!

By the way, when $V(t)$ is randomly fluctuating, filter-function formalism (FFF) is often used to average over fluctuations, and something interesting may show up if you try combine FFF and SCQC.

**Circuit Optimization for Dynamical Correction**  
Beyond continuous dynamics, I also study circuit-level optimization. The idea is just like dynamical decoupling, but the circuit actually does something rather than just live longer.    
Each physical gate may carry an error profile. By inserting pairs of single-qubit gates and their inverses (a technique called twirling), we generate equivalent circuits with different noise responses, with no overhead. By exploring the space of these equivalent circuits, we can compile noise-resilient versions that perform better on real hardware.